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
  }
];