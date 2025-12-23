
import React from 'react';
import { Flame, Crown, Zap } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, delay }: any) => (
    <div className={`bg-white p-6 rounded-3xl border-2 border-slate-200 border-b-[6px] flex flex-col items-center text-center animate-in zoom-in duration-700 ${delay}`}>
        <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-4 text-white shadow-sm`}>
            <Icon className="w-8 h-8 stroke-[3px]" />
        </div>
        <h3 className="text-4xl font-black text-slate-700 mb-1">{value}</h3>
        <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">{label}</p>
    </div>
);

export const Gamification: React.FC = () => {
  return (
      <section className="py-24 px-6 bg-[#f7f7f7] border-y-2 border-slate-200">
          <div className="max-w-5xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-black text-slate-700 mb-4">It's literally a game.</h2>
              <p className="text-xl font-bold text-slate-400">We use the same psychology as your favorite games to keep you addicted to... success.</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCard icon={Flame} value="12" label="Day Streak" color="bg-orange-500" delay="delay-0" />
              <StatCard icon={Crown} value="#1" label="League Rank" color="bg-yellow-400" delay="delay-100" />
              <StatCard icon={Zap} value="450" label="Total XP" color="bg-sky-500" delay="delay-200" />
          </div>
      </section>
  );
};
