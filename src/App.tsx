import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HallOfFame } from './components/HallOfFame';
import { Lineup } from './components/Lineup';
import { AudioCenter } from './components/AudioCenter';
import { ApplicationForm } from './components/ApplicationForm';
import { TABS, TabKey } from './types';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>(TABS.HUB);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500/30 selection:text-red-500">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="pt-24 pb-20">
        <AnimatePresence mode="wait">
          {activeTab === TABS.HUB && (
            <motion.div
              key="hub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-24"
            >
              <Hero setActiveTab={setActiveTab} />
              <HallOfFame />
              {/* News / Telegram section could go here or inside Hero */}
            </motion.div>
          )}

          {activeTab === TABS.LINEUP && (
            <motion.div
              key="lineup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Lineup />
            </motion.div>
          )}

          {activeTab === TABS.AUDIO && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AudioCenter />
            </motion.div>
          )}

          {activeTab === TABS.FORM && (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ApplicationForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/10 bg-black py-8 text-center mt-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="text-xl font-display font-black tracking-widest text-white/20">
            HUEVISION
          </div>
          <p className="text-white/30 text-xs font-mono">© 2026 ВСЕ ПРАВА ЗАЩИЩЕНЫ.</p>
        </div>
      </footer>

      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle at 50% 0%, #FF0000 0%, transparent 40%)',
             filter: 'blur(100px)'
           }}
      />
    </div>
  );
}
