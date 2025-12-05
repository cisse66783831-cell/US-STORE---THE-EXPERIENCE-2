export interface InviteData {
  name: string;
  role: string;
  mission: string;
}

export interface EncryptedInvite {
  // The encrypted string contains the JSON data
  data: string; 
}

export enum AppState {
  LOCKED = 'LOCKED',
  UNLOCKING = 'UNLOCKING',
  GRANTED = 'GRANTED',
  DENIED = 'DENIED',
  ERROR = 'ERROR'
}

// Data structure for the raw secret file
export interface SecretSource {
  code: string;
  name: string;
  role: string;
  mission: string;
}