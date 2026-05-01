import { Trophy } from 'lucide-react';

export function HallOfFame() {
  const pastWinners = [
    { rank: 1, country: 'Russia', artist: 'NIK$A', track: 'Business', score: 73 },
    { rank: 2, country: 'Revostan', artist: 'SiCka', track: 'Let Me', score: 61 },
    { rank: 3, country: 'Genshinland', artist: 'Ksivat', track: '5 Minutes', score: 59 },
    { rank: 4, country: 'Kaliningrad', artist: 'Dollova', track: 'Tore You Too', score: 54 },
  ];

  return (
    <section className="px-4 max-w-5xl mx-auto w-full">
      <div className="flex flex-col items-center text-center mb-12">
        <Trophy className="text-red-500 mb-4" size={40} />
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">ЗАЛ СЛАВЫ</h2>
        <p className="text-white/40 mt-3 font-mono text-sm tracking-widest uppercase">АРХИВ // 2025</p>
      </div>

      <div className="glass-panel border-white/5 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 border-b border-white/5 text-xs font-display text-white/30 tracking-widest uppercase">
          <div className="w-8 text-center">#</div>
          <div>Участник</div>
          <div>Трек</div>
          <div className="text-right">Баллы</div>
        </div>
        
        <div className="flex flex-col">
          {pastWinners.map((winner, i) => (
            <div 
              key={winner.rank}
              className={`grid grid-cols-[auto_1fr_1fr_auto] gap-4 p-4 items-center transition-colors hover:bg-white/[0.02] ${i !== pastWinners.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <div className={`w-8 text-center font-display font-bold text-xl ${winner.rank === 1 ? 'text-red-500 text-glow' : 'text-white/20'}`}>
                {winner.rank}
              </div>
              
              <div className="flex flex-col">
                <span className="font-bold text-white">{winner.artist}</span>
                <span className="text-xs text-white/40">{winner.country}</span>
              </div>
              
              <div className="font-mono text-sm text-white/80 shrink-0 truncate">
                {winner.track}
              </div>
              
              <div className="text-right font-display font-medium text-red-500/80">
                {winner.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
