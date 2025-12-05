/**
 * SCRIPT ADMIN - US STORE SECURITY
 * --------------------------------
 * This script takes the clear text JSON (invites_secret.json)
 * and generates the encrypted file (invites_chiffres.json)
 * using the invite Code as the encryption key.
 * 
 * USAGE:
 * 1. Ensure invites_secret.json exists in the root or same folder.
 * 2. Run: npx ts-node scripts/encrypt.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import CryptoJS from 'crypto-js';

// Types (Mirrored from app types)
interface InviteSource {
  code: string;
  name: string;
  role: string;
  mission: string;
}

interface EncryptedPayload {
  name: string;
  role: string;
  mission: string;
}

// Paths
const SOURCE_FILE = path.join((process as any).cwd(), 'invites_secret.json');
const OUTPUT_FILE = path.join((process as any).cwd(), 'public', 'invites_chiffres.json');

const encryptFile = () => {
  console.log('🔒 STARTING ENCRYPTION SEQUENCE...');

  try {
    // 1. Read Source
    if (!fs.existsSync(SOURCE_FILE)) {
      throw new Error(`Source file not found at: ${SOURCE_FILE}`);
    }
    
    const rawData = fs.readFileSync(SOURCE_FILE, 'utf-8');
    const invites: InviteSource[] = JSON.parse(rawData);
    
    console.log(`📝 Found ${invites.length} invites to process.`);

    // 2. Encrypt Each Entry
    // We only save the encrypted string. The app must try to decrypt all strings
    // with the user input until one works.
    const encryptedList: string[] = invites.map(invite => {
      const payload: EncryptedPayload = {
        name: invite.name,
        role: invite.role,
        mission: invite.mission
      };

      // ENCRYPTION: The Key is the User Code
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), invite.code).toString();
      return encrypted;
    });

    // 3. Write Output
    // Ensure public dir exists
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(encryptedList, null, 2));
    
    console.log('✅ ENCRYPTION COMPLETE.');
    console.log(`📂 Output saved to: ${OUTPUT_FILE}`);
    console.log('🚀 Ready for deployment.');

  } catch (error) {
    console.error('❌ FATAL ERROR:', error);
    (process as any).exit(1);
  }
};

encryptFile();