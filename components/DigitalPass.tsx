import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { InviteData } from '../types';
import { CheckCircle2, MapPin, Calendar, Clock } from 'lucide-react';

interface DigitalPassProps {
  data: InviteData;
  userCode: string;
}

const DigitalPass: React.FC<DigitalPassProps> = ({ data, userCode }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 bg-usBlack relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 pointer-events-none"></div>
      
      {/* Ambient Red Glow */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-usRed/10 to-transparent pointer-events-none" 
      />

      <motion.div 
        initial={{ scale: 0.8, rotateX: 20, y: 100, opacity: 0 }}
        animate={{ scale: 1, rotateX: 0, y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          delay: 0.2
        }}
        className="w-full max-w-[400px] perspective-1000 relative z-10"
      >
        {/* The Card */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="bg-white rounded-[2rem] overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.4)] relative"
        >
          {/* Scanning Line Animation */}
          <motion.div 
            initial={{ top: "-10%" }}
            animate={{ top: "150%" }}
            transition={{ duration: 2, ease: "linear", delay: 0.5 }}
            className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-usRed/30 to-transparent z-20 pointer-events-none"
          />

          {/* Header */}
          <div className="bg-usRed p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.3),transparent)]"></div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <div className="flex justify-center mb-2">
                <CheckCircle2 className="text-white drop-shadow-md" size={32} />
              </div>
              <h2 className="text-white font-black tracking-widest text-sm uppercase drop-shadow-sm">Invitation Confirmée</h2>
            </motion.div>
          </div>

          {/* Body */}
          <div className="p-8 flex flex-col items-center text-center space-y-7 relative bg-white">
            
            <div className="space-y-1 relative z-10">
              <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">Invité</p>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="text-usBlack text-3xl font-bold tracking-tight"
              >
                {data.name}
              </motion.h1>
            </div>

            <div className="space-y-2 w-full relative z-10">
              <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest border-b border-gray-100 pb-1">Fonction</p>
              <motion.div 
                initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="py-2"
              >
                <h3 className="text-4xl leading-tight font-black italic text-transparent bg-clip-text bg-gradient-to-r from-usRed to-red-900 uppercase transform -rotate-1 drop-shadow-sm">
                  {data.role}
                </h3>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="space-y-1 w-full"
            >
              <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">Mission</p>
              <div className="text-usBlack font-bold text-xs bg-gray-100 py-3 px-4 rounded-lg border border-gray-200">
                {data.mission}
              </div>
            </motion.div>

            {/* Event Details Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="grid grid-cols-2 gap-3 w-full mt-2 text-left"
            >
              <div className="bg-usDarkGray text-white p-3 rounded-xl space-y-1 border border-gray-800">
                <Calendar size={14} className="text-usRed" />
                <p className="text-[9px] text-gray-400 font-mono">DATE</p>
                <p className="text-xs font-bold">20 DEC 2025</p>
              </div>
              <div className="bg-usDarkGray text-white p-3 rounded-xl space-y-1 border border-gray-800">
                <Clock size={14} className="text-usRed" />
                <p className="text-[9px] text-gray-400 font-mono">HEURE</p>
                <p className="text-xs font-bold">08H - 19H</p>
              </div>
              <div className="col-span-2 bg-usDarkGray text-white p-3 rounded-xl flex items-center gap-3 border border-gray-800">
                <div className="bg-usRed/20 p-2 rounded-full">
                  <MapPin size={16} className="text-usRed" />
                </div>
                <div>
                   <p className="text-[9px] text-gray-400 font-mono">LIEU</p>
                   <p className="text-xs font-bold">BOUTIQUE US STORE, OUAGA 2000</p>
                </div>
              </div>
            </motion.div>

            {/* Footer QR */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-4 pt-6 border-t border-dashed border-gray-200 w-full flex flex-col items-center gap-3"
            >
              <div className="p-2 border border-gray-100 rounded-lg shadow-sm bg-white relative">
                <QRCodeSVG value={userCode} size={80} fgColor="#050505" />
                {/* Corner Accents */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-usRed"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-usRed"></div>
              </div>
              <p className="font-mono text-[9px] text-gray-400 tracking-widest">{userCode}</p>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DigitalPass;