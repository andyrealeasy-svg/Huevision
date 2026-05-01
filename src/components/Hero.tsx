import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageSquareWarning } from 'lucide-react';
import { TabKey, TABS } from '../types';

export function Hero({ setActiveTab }: { setActiveTab: (t: TabKey) => void }) {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number; totalDistance: number } | null>(null);

  useEffect(() => {
    // 10 мая 2026 12:00 PM UTC+3 (МСК)
    const targetDate = new Date('2026-05-10T12:00:00+03:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0, totalDistance: 0 });
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
        totalDistance: distance
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  let pulseDuration = '3s';
  if (timeLeft) {
    const daysRemaining = Math.max(0, timeLeft.totalDistance / (1000 * 60 * 60 * 24));
    if (daysRemaining <= 1) pulseDuration = '0.5s';
    else if (daysRemaining <= 3) pulseDuration = '1s';
    else if (daysRemaining <= 7) pulseDuration = '1.5s';
    else if (daysRemaining <= 14) pulseDuration = '2s';
  }

  return (
    <section className="relative px-4 pt-12 lg:pt-24 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] select-none">
          HUEVISION<br className="md:hidden" /> <span className="text-red-500 text-glow">2026</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-white/50 font-light tracking-wide max-w-2xl mx-auto">
          Звук завтрашнего дня. Без компромиссов. Без правил.
        </p>
      </motion.div>

      {timeLeft && (
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-col items-center"
        >
          <p className="text-red-500 text-sm tracking-[0.2em] uppercase font-bold mb-6 font-display flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            ПРИЕМ ЗАЯВОК ОТКРОЕТСЯ ЧЕРЕЗ
          </p>
          <div className="flex gap-4 md:gap-8">
            {[
              { label: 'ДНЕЙ', value: timeLeft.d },
              { label: 'ЧАСОВ', value: timeLeft.h },
              { label: 'МИНУТ', value: timeLeft.m },
              { label: 'СЕКУНД', value: timeLeft.s }
            ].map((unit, i) => {
              const formattedValue = unit.value.toString().padStart(2, '0');
              return (
              <div key={i} className="flex flex-col items-center">
                <div 
                  className="w-16 h-20 md:w-24 md:h-28 glass-panel animate-intense-glow flex items-center justify-center relative overflow-hidden rounded-md border-red-500/30"
                  style={{ '--pulse-duration': pulseDuration } as React.CSSProperties}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={formattedValue}
                      initial={{ y: '50%', opacity: 0, filter: 'blur(4px)' }}
                      animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: '-50%', opacity: 0, filter: 'blur(4px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="absolute font-display font-medium text-3xl md:text-5xl text-white drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                    >
                      {formattedValue}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="mt-4 text-xs tracking-widest text-white/40 font-display">{unit.label}</span>
              </div>
            )})}
          </div>
        </motion.div>
      )}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <button 
          onClick={() => setActiveTab(TABS.FORM)}
          className="group relative p-8 glass-panel border-white/10 hover:border-red-500/50 transition-all text-left overflow-hidden flex flex-col justify-between"
          style={{ minHeight: '180px' }}
        >
          <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors" />
          <div className="relative z-10">
             <h3 className="text-2xl font-display font-bold text-white group-hover:text-red-500 transition-colors">Подать заявку</h3>
             <p className="text-white/40 mt-2">Отправь свой трек. Стань участником или жюри.</p>
          </div>
          <ArrowRight className="text-white/20 group-hover:text-red-500 transition-colors ml-auto relative z-10" size={32} />
        </button>

        <a 
          href="https://t.me/HueVisionOfficial" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative p-8 glass-panel border-white/10 hover:border-blue-500/50 transition-all text-left overflow-hidden flex flex-col justify-between"
          style={{ minHeight: '180px' }}
        >
           <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
           <div className="relative z-10">
             <div className="flex items-center gap-3 mb-2">
                <MessageSquareWarning className="text-blue-400" />
                <h3 className="text-2xl font-display font-bold text-white">Новости</h3>
             </div>
             <p className="text-white/40">Официальный Telegram-канал. Будь в курсе.</p>
           </div>
           <ArrowRight className="text-white/20 group-hover:text-blue-500 transition-colors ml-auto relative z-10" size={32} />
        </a>
      </motion.div>
    </section>
  );
}
