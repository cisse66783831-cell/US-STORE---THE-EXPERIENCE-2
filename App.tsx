import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AccessTerminal from './components/AccessTerminal';
import DigitalPass from './components/DigitalPass';
import SystemError from './components/SystemError';
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
    try {
      console.log("Initializing Secure Vault...");
      
      // Simulation of a critical check (e.g. fetching file)
      if (!DEMO_SECRETS || DEMO_SECRETS.length === 0) {
        throw new Error("Source data corrupted or missing.");
      }

      ENCRYPTED_STORE = DEMO_SECRETS.map(secret => {
        const payload: InviteData = {
          name: secret.name,
          role: secret.role,
          mission: secret.mission
        };
        return encryptInvite(payload, secret.code);
      });
      
      console.log("Vault Locked. Ready for input.");
    } catch (e) {
      console.error("CRITICAL FAILURE:", e);
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleUnlockAttempt = async (code: string) => {
    setIsLoading(true);
    setIsError(false);
    setUserCode(code);

    // Simulate calculation time / network delay
    setTimeout(() => {
      let foundInvite: InviteData | null = null;

      try {
        if (appState === AppState.ERROR) {
             throw new Error("System is down");
        }

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
      } catch (e) {
        setAppState(AppState.ERROR);
      }
      
      setIsLoading(false);
    }, 1500); // Slightly longer for the "hacking" effect
  };

  return (
    <main className="w-full min-h-screen bg-usBlack text-white antialiased font-sans selection:bg-usRed selection:text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {appState === AppState.ERROR ? (
           <SystemError key="error" />
        ) : appState === AppState.LOCKED || appState === AppState.DENIED ? (
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