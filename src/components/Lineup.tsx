import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { User, ShieldAlert } from 'lucide-react';

interface Entry {
  id: string;
  type: 'participant' | 'jury';
  nickname: string;
  country?: string;
  trackName?: string;
  bio: string;
  tgLink: string;
}

export function Lineup() {
  const [activeFilter, setActiveFilter] = useState<'participant' | 'jury'>('participant');
  
  // Empty data as requested
  const entries: Entry[] = [];

  const filteredEntries = entries.filter(e => e.type === activeFilter);

  return (
    <section className="px-4 max-w-7xl mx-auto w-full pt-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase text-white">
            <span className="text-red-500">ЛАЙНАП</span>
          </h2>
          <p className="text-white/40 font-mono text-sm mt-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse blur-[1px]"></span>
            СТАТУС: ОЖИДАНИЕ ДАННЫХ
          </p>
        </div>

        <div className="flex bg-white/5 rounded-none border border-white/5 p-1 w-full md:w-auto shrink-0">
          <button
            onClick={() => setActiveFilter('participant')}
            className={cn(
              "flex-1 md:flex-none px-6 py-2 text-sm font-display uppercase tracking-widest transition-all",
              activeFilter === 'participant' ? "bg-red-500 text-white font-bold" : "text-white/50 hover:text-white"
            )}
          >
            Участники
          </button>
          <button
            onClick={() => setActiveFilter('jury')}
            className={cn(
              "flex-1 md:flex-none px-6 py-2 text-sm font-display uppercase tracking-widest transition-all",
              activeFilter === 'jury' ? "bg-red-500 text-white font-bold" : "text-white/50 hover:text-white"
            )}
          >
            Жюри
          </button>
        </div>
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {filteredEntries.length === 0 ? (
             <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-64 glass-panel border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-6"
             >
               <ShieldAlert className="text-red-500/50 mb-4" size={48} />
               <h3 className="font-display font-bold text-2xl text-white/80">НЕТ ДАННЫХ</h3>
               <p className="text-white/40 mt-2 max-w-md">Список пока пуст. Информация появится после окончания приема заявок и отбора.</p>
             </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Future cards will render here */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
