
import React from 'react';

export const SocialProof: React.FC = () => {
  return (
      <section className="bg-slate-900 py-12 overflow-hidden border-y-4 border-slate-200">
          <div className="max-w-7xl mx-auto px-6 text-center">
             <p className="font-black text-slate-500 uppercase tracking-[0.3em] mb-8 text-xs">Used by students accepted into</p>
             <div className="flex flex-wrap gap-x-12 gap-y-8 items-center justify-center">
                  {['Harvard', 'Stanford', 'MIT', 'Yale', 'Oxford', 'Cambridge'].map(uni => (
                      <span key={uni} className="text-2xl md:text-4xl font-black text-white/40 hover:text-white transition-colors cursor-default select-none">{uni}</span>
                  ))}
             </div>
          </div>
      </section>
  );
};
