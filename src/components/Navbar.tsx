import { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Skull, FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { TABS, TabKey } from '../types';

interface NavbarProps {
  activeTab: TabKey;
  setActiveTab: Dispatch<SetStateAction<TabKey>>;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const navItems = [
    { id: TABS.HUB, label: 'ГЛАВНАЯ', icon: Skull },
    { id: TABS.LINEUP, label: 'ЛАЙНАП', icon: Users },
    { id: TABS.AUDIO, label: 'МЕДИАЦЕНТР', icon: Play },
    { id: TABS.FORM, label: 'ЗАЯВКА', icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b-0 border-white/5 py-4">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div 
          className="text-red-500 font-display font-black text-xl tracking-widest uppercase cursor-pointer"
          onClick={() => setActiveTab(TABS.HUB)}
        >
          HUEVISION<span className="text-white ml-1 text-sm glow">26</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "relative px-6 py-2 text-sm font-display font-medium uppercase tracking-wider transition-all duration-300",
                  isActive ? "text-red-500" : "text-white/60 hover:text-white"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={16} className={isActive ? "text-red-500" : "text-white/40"} />
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-red-500/10 border border-red-500/20 box-glow"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile menu - simplified for brevity, maybe just icons or a slick dropdown */}
        <div className="flex md:hidden items-center space-x-2">
           {navItems.map((item) => {
             const Icon = item.icon;
             const isActive = activeTab === item.id;
             return (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 className={cn(
                   "p-3 rounded-none transition-colors",
                   isActive ? "text-red-500 bg-red-500/10 box-glow border border-red-500/20" : "text-white/60 hover:text-white"
                 )}
               >
                 <Icon size={20} />
               </button>
             )
           })}
        </div>
      </div>
    </nav>
  );
}
