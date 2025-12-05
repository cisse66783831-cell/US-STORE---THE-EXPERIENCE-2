import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, ServerCrash, WifiOff } from 'lucide-react';

const SystemError: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-usBlack relative overflow-hidden text-red-600"
    >
      {/* Background Glitch Noise */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      
      {/* Red Alert Flash */}
      <motion.div 
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 bg-red-900 pointer-events-none"
      />

      <div className="max-w-lg w-full z-10 text-center space-y-8 border border-red-900/50 p-10 bg-black/50 backdrop-blur-md rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.2)]">
        
        <motion.div 
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <div className="relative">
            <AlertTriangle size={80} className="text-usRed" />
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute inset-0 text-white mix-blend-overlay translate-x-1"
            >
              <AlertTriangle size={80} />
            </motion.div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            <span className="text-usRed">SYSTEM</span> FAILURE
          </h1>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
          <p className="font-mono text-sm md:text-base text-red-400">
            ERREUR CRITIQUE DE DÉPLOIEMENT
          </p>
        </div>

        <div className="bg-red-950/30 border border-red-900/50 p-4 rounded text-left font-mono text-xs text-red-300 space-y-2">
          <p className="flex items-center gap-2">
            <ServerCrash size={12} />
            <span>CODE: ERR_DEPLOY_0xCRASH</span>
          </p>
          <p className="flex items-center gap-2">
            <WifiOff size={12} />
            <span>STATUS: DATABASE_UNREACHABLE</span>
          </p>
          <p className="opacity-70 mt-2 border-t border-red-900/30 pt-2">
            Le coffre-fort chiffré est inaccessible. Veuillez contacter l'administrateur système ou vérifier la connexion.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-usRed text-white font-bold tracking-widest uppercase text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-900/50"
        >
          <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          <span>Réinitialiser le système</span>
        </motion.button>

      </div>

      <div className="absolute bottom-6 text-[10px] text-red-900/60 font-mono tracking-[0.5em]">
        NO CONNECTION // SYSTEM HALTED
      </div>

    </motion.div>
  );
};

export default SystemError;