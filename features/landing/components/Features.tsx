
import React from 'react';
import { CheckCircle2, Zap, Trophy, Swords, BookOpen, Target } from 'lucide-react';

interface FeaturesProps {
    onStart: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onStart }) => {
  return (
    <>
      {/* FEATURE ROW 1 */}
      <section className="py-24 px-6 bg-white border-t-2 border-slate-100">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left space-y-6">
                  <h2 className="text-4xl font-display font-black text-slate-700 leading-tight">
                      Neural intelligence at your fingertips.
                  </h2>
                  <p className="text-xl font-bold text-slate-400 leading-relaxed">
                      Access deep, community-scouted data on 10,000+ elite programs. We find the details others miss.
                  </p>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                  <div className="w-64 h-64 bg-duo-blue rounded-[40px] border-b-[12px] border-duo-blueDark flex items-center justify-center shadow-2xl rotate-3">
                      <Zap size={100} className="text-white fill-white/20" />
                  </div>
              </div>
          </div>
      </section>

      {/* FEATURE ROW 2 */}
      <section className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 flex justify-center">
                  <div className="w-64 h-64 bg-duo-green rounded-[40px] border-b-[12px] border-duo-greenDark flex items-center justify-center shadow-2xl -rotate-3">
                      <Swords size={100} className="text-white" />
                  </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                  <h2 className="text-4xl font-display font-black text-slate-700 leading-tight">
                      Master the Arena with AI Bosses.
                  </h2>
                  <p className="text-xl font-bold text-slate-400 leading-relaxed">
                      Defeat realistic high-pressure interview simulations. Get real-time damage reports on your performance.
                  </p>
              </div>
          </div>
      </section>

      {/* FEATURE ROW 3 */}
      <section className="py-24 px-6 bg-white pb-32">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-left space-y-6">
                  <h2 className="text-4xl font-display font-black text-slate-700 leading-tight">
                      Tempa dokumen di The Forge.
                  </h2>
                  <p className="text-xl font-bold text-slate-400 leading-relaxed">
                      Craft elite document artifacts that bypass any admission filter. Automated quality audit in seconds.
                  </p>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
                  <div className="w-64 h-64 bg-duo-purple rounded-[40px] border-b-[12px] border-duo-purpleDark flex items-center justify-center shadow-2xl rotate-2">
                      <BookOpen size={100} className="text-white" />
                  </div>
              </div>
          </div>
      </section>
    </>
  );
};
