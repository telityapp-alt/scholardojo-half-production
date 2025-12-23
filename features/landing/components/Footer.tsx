
import React from 'react';
import { Swords } from 'lucide-react';

interface FooterProps {
    onStart: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onStart }) => {
  return (
    <>
      {/* Mega Footer CTA */}
      <section className="py-24 px-6 bg-slate-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
                  Ready to win big?
              </h2>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                   <button 
                    onClick={onStart}
                    className="px-12 py-6 bg-[#1cb0f6] hover:bg-[#1899d6] text-white rounded-3xl font-black text-2xl border-b-[8px] border-[#1899d6] active:border-b-0 active:translate-y-[8px] transition-all uppercase tracking-widest shadow-2xl"
                  >
                      Join the Dojo
                  </button>
              </div>
              <p className="mt-8 font-bold text-slate-500 uppercase tracking-widest text-sm">
                  Join 15,000+ Students • No Credit Card Required
              </p>
          </div>
      </section>

      {/* Footer Links */}
      <footer className="bg-slate-900 border-t-2 border-slate-800 py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 font-bold text-sm">
              <div className="flex items-center gap-2">
                  <Swords className="w-6 h-6" />
                  <span className="font-display uppercase italic tracking-tighter">© 2025 ScholarDojo</span>
              </div>
              <div className="flex gap-8">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
              </div>
          </div>
      </footer>
    </>
  );
};
