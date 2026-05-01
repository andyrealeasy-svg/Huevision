import { useState, useEffect } from 'react';
import { Lock, FileWarning, KeyRound } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function ApplicationForm() {
  const [isLocked, setIsLocked] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<'participant' | 'jury'>('participant');

  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleBypass = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginInput === 'AssQueenGrrah' && passwordInput === 'GowkGowkGowk123') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('ДОСТУП ЗАПРЕЩЕН. НЕВЕРНЫЕ ДАННЫЕ.');
    }
  };

  useEffect(() => {
    const targetDate = new Date('2026-05-10T12:00:00+03:00').getTime();
    
    const checkLock = () => {
      const now = new Date().getTime();
      setIsLocked(now < targetDate);
    };

    checkLock();
    const interval = setInterval(checkLock, 1000);
    return () => clearInterval(interval);
  }, []);

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-none p-3 text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-colors font-sans";
  const labelClasses = "block text-xs font-display text-white/50 mb-2 uppercase tracking-widest";

  return (
    <section className="px-4 max-w-3xl mx-auto w-full pt-12 relative">
      <div className="mb-10 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-white">
          ПОДАЧА <span className="text-red-500">ЗАЯВКИ</span>
        </h2>
        <p className="text-white/40 font-mono text-sm mt-2">ТЕРМИНАЛ РЕГИСТРАЦИИ</p>
      </div>

      <div className="relative">
        {/* Lock Overlay */}
        {isLocked && !isAuthenticated && (
          <div className="absolute inset-0 z-50 glass-panel flex flex-col items-center justify-center p-8 text-center backdrop-blur-xl border-red-500/20">
             <Lock className="text-red-500 mb-4" size={48} />
             <h3 className="text-2xl font-display font-bold text-white mb-2">ТЕРМИНАЛ ЗАБЛОКИРОВАН</h3>
             <p className="text-white/60 max-w-sm mb-6">Прием заявок откроется 10 мая 2026 года в 12:00 (МСК).</p>
             
             <form onSubmit={handleBypass} className="w-full max-w-xs flex flex-col gap-3 mt-4">
               <input 
                 type="text" 
                 value={loginInput} 
                 onChange={(e) => setLoginInput(e.target.value)} 
                 placeholder="Идентификатор" 
                 className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-red-500 outline-none text-center font-mono placeholder:text-white/20 transition-colors"
               />
               <input 
                 type="password" 
                 value={passwordInput} 
                 onChange={(e) => setPasswordInput(e.target.value)} 
                 placeholder="Пароль доступа" 
                 className="w-full bg-black/50 border border-white/10 p-3 text-sm text-white focus:border-red-500 outline-none text-center font-mono placeholder:text-white/20 transition-colors"
               />
               <button 
                 type="submit" 
                 className="w-full border border-red-500/50 bg-red-500/10 hover:bg-red-500/20 text-red-500 py-3 text-xs font-mono uppercase tracking-widest transition-colors flex items-center justify-center gap-2 mt-2"
               >
                 <KeyRound size={16} /> СНЯТЬ БЛОКИРОВКУ
               </button>
               {errorMsg && (
                 <p className="text-xs font-mono text-red-500 mt-2 animate-pulse">{errorMsg}</p>
               )}
             </form>
          </div>
        )}

        <div className={cn("glass-panel p-6 md:p-10", (isLocked && !isAuthenticated) && "opacity-20 pointer-events-none select-none filter blur-sm")}>
          <div className="flex bg-white/5 p-1 mb-8">
            <button
              onClick={() => setRole('participant')}
              className={cn(
                "flex-1 py-3 text-sm font-display uppercase tracking-widest transition-all",
                role === 'participant' ? "bg-red-500 text-white font-bold" : "text-white/50 hover:text-white"
              )}
            >
              Я участник
            </button>
            <button
              onClick={() => setRole('jury')}
              className={cn(
                "flex-1 py-3 text-sm font-display uppercase tracking-widest transition-all",
                role === 'jury' ? "bg-red-500 text-white font-bold" : "text-white/50 hover:text-white"
              )}
            >
              Я жюри
            </button>
          </div>

          <form 
            action="https://formspree.io/f/xzdyoeyk" 
            method="POST"
            encType="multipart/form-data"
            className="space-y-6"
            onSubmit={(e) => {
               // Formspree handles the actual submission, 
               // HTML5 required and accept attributes handle basic validation.
            }}
          >
            {/* Hidden field to identify the role in Formspree */}
            <input type="hidden" name="Role" value={role.toUpperCase()} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Никнейм</label>
                <input type="text" name="Nickname" required className={inputClasses} placeholder="Введите ваш псевдоним" />
              </div>

              {role === 'participant' && (
                <div>
                  <label className={labelClasses}>Страна</label>
                  <input type="text" name="Country" required className={inputClasses} placeholder="Например: Россия, Москва" />
                </div>
              )}
            </div>

            {role === 'participant' && (
              <div>
                <label className={labelClasses}>Название трека</label>
                <input type="text" name="TrackName" required className={inputClasses} placeholder="Название вашей работы" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {role === 'participant' && (
                <div>
                  <label className={labelClasses}>Загрузка аудио (MP3/WAV)</label>
                  <input 
                    type="file" 
                    name="AudioFile" 
                    required 
                    accept=".mp3,.wav,audio/mpeg,audio/wav"
                    className="w-full text-white/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-display file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600 transition-colors file:cursor-pointer p-2 bg-white/5 border border-white/10" 
                  />
                </div>
              )}

              <div className={role === 'jury' ? 'md:col-span-2' : ''}>
                <label className={labelClasses}>Загрузка фото (JPG/PNG)</label>
                <input 
                  type="file" 
                  name="PhotoFile" 
                  required 
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  className="w-full text-white/50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-display file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 transition-colors file:cursor-pointer p-2 bg-white/5 border border-white/10" 
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Биография</label>
              <textarea 
                name="Biography" 
                required 
                rows={4} 
                className={cn(inputClasses, "resize-none")} 
                placeholder="Расскажите о себе..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-4 mt-4 bg-white text-black font-display font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2"
            >
              <FileWarning size={18} />
              Отправить заявку
            </button>
            <p className="text-center text-[10px] text-white/30 font-mono mt-4">
              БЕЗОПАСНАЯ ПЕРЕДАЧА ДАННЫХ ЧЕРЕЗ ПРОТОКОЛ FORMSPREE
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
