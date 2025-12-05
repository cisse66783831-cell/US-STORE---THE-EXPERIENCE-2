import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, ShieldCheck, AlertCircle, Loader2, Play } from 'lucide-react';

interface AccessTerminalProps {
  onAttemptUnlock: (code: string) => void;
  isError: boolean;
  isLoading: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 10 }
  }
};

const AccessTerminal: React.FC<AccessTerminalProps> = ({ onAttemptUnlock, isError, isLoading }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() && !isLoading) {
      onAttemptUnlock(code.trim());
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background Decor - Animated Blob */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-usRed blur-[150px] rounded-full pointer-events-none opacity-10" 
      />

      <div className="max-w-xl w-full z-10 space-y-8 flex flex-col items-center">
        
        {/* CUSTOM LOGO RECREATION */}
        <motion.div variants={itemVariants} className="relative flex flex-col items-center mb-6 pt-8">
          
          {/* Decorative Elements (Floating) */}
          <motion.div 
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-0 left-10"
          >
             {/* Squiggle */}
             <svg width="40" height="12" viewBox="0 0 40 12" className="stroke-white stroke-[3] fill-none opacity-80">
               <path d="M2,6 Q10,-4 20,6 T38,6" />
             </svg>
          </motion.div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute top-2 right-1/3 w-4 h-4 border-[3px] border-usRed rounded-full" 
          />
          
          {/* Confetti Pieces */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
            className="absolute -left-6 top-16 w-3 h-8 bg-yellow-400 -rotate-12 opacity-90" 
          />
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 3, repeat: Infinity }} 
            className="absolute right-4 top-20 w-2 h-2 bg-usRed rounded-full" 
          />
          <motion.div 
            className="absolute left-24 -top-2 w-1.5 h-1.5 bg-usRed rounded-full" 
          />
          <motion.div 
            className="absolute right-20 bottom-10 w-2 h-6 bg-red-600 rotate-45 opacity-80" 
          />

          {/* Main Text Block */}
          <div className="relative">
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none flex items-center z-10 relative">
              <span className="text-usRed">US</span>
              <span className="text-white ml-3">STORE</span>
            </h1>
            
            {/* Play Badge 2 */}
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="absolute -top-6 -right-10 bg-usRed text-white w-16 h-16 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(220,38,38,0.6)] z-20 border-4 border-usBlack"
            >
              <Play size={14} fill="white" className="ml-1" /> 
              <span className="text-2xl font-black leading-none ml-0.5">2</span>
            </motion.div>
          </div>

          {/* Subtitles */}
          <div className="relative mt-2 text-center w-full">
             <h2 className="text-xl md:text-2xl font-bold text-usRed tracking-widest uppercase font-sans">
               Thank You Experience
             </h2>
          </div>

          {/* Date */}
          <div className="mt-8 flex items-center gap-4 md:gap-8 text-[10px] md:text-xs font-bold tracking-[0.3em] text-white/80 font-mono border-t border-white/10 pt-4 w-full justify-center">
            <span>20</span>
            <span>DÉCEMBRE</span>
            <span>2025</span>
          </div>

        </motion.div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 mt-4">
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-mono text-usRed tracking-widest uppercase flex items-center gap-2 pl-1">
              <Terminal size={12} />
              Identifiant d'accès sécurisé
            </label>
            <div className="relative group">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={isLoading}
                placeholder="XXXX-XXXX-XXXX"
                className={`w-full bg-usDarkGray/80 backdrop-blur-sm border-l-4 ${isError ? 'border-red-500 text-red-500' : 'border-usRed text-white'} p-5 font-mono text-lg tracking-wider placeholder-gray-700 focus:outline-none focus:ring-1 focus:ring-usRed/50 transition-all shadow-lg rounded-r-lg`}
                autoFocus
              />
              
              {/* Scanline inside input */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10 rounded-r-lg">
                 <div className="w-full h-[2px] bg-white absolute top-0 animate-scan" />
              </div>

              {isError && (
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 flex items-center gap-2 text-xs font-mono bg-usBlack px-2 py-1 rounded"
                >
                  <AlertCircle size={14} />
                  ACCÈS REFUSÉ
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || code.length === 0}
            whileHover={!isLoading && code.length > 0 ? { scale: 1.02 } : {}}
            whileTap={!isLoading && code.length > 0 ? { scale: 0.98 } : {}}
            className={`w-full group relative overflow-hidden bg-white text-usBlack hover:bg-gray-100 font-bold py-5 uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-sm`}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Loader2 className="animate-spin text-usRed" size={18} />
                <span className="font-mono text-sm">Déchiffrement AES...</span>
              </div>
            ) : (
              <>
                <span>Initialiser l'accès</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform text-usRed" size={18} />
              </>
            )}
            
            {/* Hover Glare Effect */}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 transform skew-x-12" />
          </motion.button>
        </form>
        
        <motion.div variants={itemVariants} className="text-center pt-4">
          <p className="text-[9px] text-gray-600 font-mono flex items-center justify-center gap-2 opacity-60">
            <ShieldCheck size={10} />
            PROTOCOLE DE SÉCURITÉ V2.0 // CLIENT-SIDE ONLY
          </p>
        </motion.div>
      </div>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default AccessTerminal;