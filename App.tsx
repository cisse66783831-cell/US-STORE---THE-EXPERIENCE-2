import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AccessTerminal from './components/AccessTerminal';
import DigitalPass from './components/DigitalPass';
import { AppState, InviteData } from './types';
import { attemptDecryption, encryptInvite } from './utils/security';
import { DEMO_SECRETS } from './data/demoDb';

// In a real app, this would be fetched from '/invites_chiffres.json'
// We use a memory store here for the demo.
let ENCRYPTED_STORE: string[] = [];

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOCKED);
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Initialize the "Database" (Simulation)
  useEffect(() => {
    console.log("Initializing Secure Vault...");
    ENCRYPTED_STORE = DEMO_SECRETS.map(secret => {
      const payload: InviteData = {
        name: secret.name,
        role: secret.role,
        mission: secret.mission
      };
      return encryptInvite(payload, secret.code);
    });
    console.log("Vault Locked. Ready for input.");
  }, []);

  const handleUnlockAttempt = async (code: string) => {
    setIsLoading(true);
    setIsError(false);
    setUserCode(code);

    // Simulate calculation time / network delay
    setTimeout(() => {
      let foundInvite: InviteData | null = null;

      for (const encryptedEntry of ENCRYPTED_STORE) {
        const result = attemptDecryption(encryptedEntry, code);
        if (result) {
          foundInvite = result;
          break; 
        }
      }

      if (foundInvite) {
        setInviteData(foundInvite);
        setAppState(AppState.GRANTED);
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
      }
      
      setIsLoading(false);
    }, 1500); // Slightly longer for the "hacking" effect
  };

  return (
    <main className="w-full min-h-screen bg-usBlack text-white antialiased font-sans selection:bg-usRed selection:text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {appState === AppState.LOCKED || appState === AppState.DENIED ? (
          <AccessTerminal 
            key="terminal"
            onAttemptUnlock={handleUnlockAttempt}
            isError={isError}
            isLoading={isLoading}
          />
        ) : (
          inviteData && (
            <DigitalPass 
              key="pass"
              data={inviteData} 
              userCode={userCode}
            />
          )
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;