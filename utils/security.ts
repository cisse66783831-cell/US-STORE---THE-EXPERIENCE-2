import CryptoJS from 'crypto-js';
import { InviteData } from '../types';

/**
 * Tries to decrypt an encrypted string using the provided code as the key.
 * If successful, parses the JSON and returns InviteData.
 * If failed (wrong key), throws an error or returns null.
 */
export const attemptDecryption = (encryptedData: string, codeKey: string): InviteData | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, codeKey);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) return null;
    
    const data: InviteData = JSON.parse(decryptedString);
    return data;
  } catch (e) {
    return null;
  }
};

/**
 * Encrypts data using the code as the key.
 * Used by the admin script or the demo initializer.
 */
export const encryptInvite = (data: InviteData, codeKey: string): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), codeKey).toString();
};