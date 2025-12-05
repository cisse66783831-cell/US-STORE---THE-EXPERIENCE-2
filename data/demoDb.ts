import { SecretSource } from '../types';

/**
 * NOTE FOR USER:
 * In a real deployment, this data would exist in 'invites_secret.json'
 * and be processed by 'scripts/encrypt.ts' into 'public/invites_chiffres.json'.
 * 
 * For this demo to work without running the Node script, we will
 * use this array to generate the encrypted store in memory when the App loads.
 */
export const DEMO_SECRETS: SecretSource[] = [
  // --- EXISTANTS ---
  {
    code: "U-S01-TYE2",
    name: "Issa Cissé",
    role: "IOS EVANGELIST",
    mission: "ACCÈS À US STORE EXPERIENCE 2"
  },
  {
    code: "U-S02-VIP",
    name: "Sarah O.",
    role: "BRAND AMBASSADOR",
    mission: "ACCÈS VIP"
  },
  // --- NOUVEAUX (10) ---
  {
    code: "U-S03-DES",
    name: "Marc Andre",
    role: "HEAD OF DESIGN",
    mission: "REVIEW CREATIVE"
  },
  {
    code: "U-S04-NEO",
    name: "Nadia K.",
    role: "DIGITAL NOMAD",
    mission: "LIFESTYLE SHOWCASE"
  },
  {
    code: "U-S05-DEV",
    name: "Tariq J.",
    role: "FULLSTACK ARCHITECT",
    mission: "SYSTEM SECURITY AUDIT"
  },
  {
    code: "U-S06-PRO",
    name: "Elena S.",
    role: "PRODUCT STRATEGIST",
    mission: "LAUNCH KEYNOTE"
  },
  {
    code: "U-S07-VEO",
    name: "Sam D.",
    role: "VIDEO DIRECTOR",
    mission: "MEDIA COVERAGE"
  },
  {
    code: "U-S08-CRE",
    name: "Léa V.",
    role: "CONTENT CREATOR",
    mission: "SOCIAL MEDIA TAKEOVER"
  },
  {
    code: "U-S09-EXP",
    name: "Omar F.",
    role: "EXPERIENCE MANAGER",
    mission: "GUEST FLOW CONTROL"
  },
  {
    code: "U-S10-LEG",
    name: "Sophie L.",
    role: "LEGACY MEMBER",
    mission: "LIFETIME ACCESS"
  },
  {
    code: "U-S11-FUT",
    name: "Ryan G.",
    role: "FUTURIST",
    mission: "TECH TALK SESSION"
  },
  {
    code: "U-S12-BLK",
    name: "Phantom X.",
    role: "GHOST PROTOCOL",
    mission: "CLASSIFIED CLEARANCE"
  }
];