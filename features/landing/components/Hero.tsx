
import React from 'react';
/* Added missing ShieldCheck import */
import { ArrowRight, Flame, Gem, Crown, Target, Sparkles, User, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onLogin: () => void;
  onGuest: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onLogin, onGuest }) => {
  return (
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden bg-white">
          {/* DUO PATTERN BACKGROUND */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-40"></div>
          
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
              
              {/* LEFT: HIGH-IMPACT TYPOGRAPHY */}
              <div className="space-y-10 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-700">
                  <div className="inline-flex items-center gap-2 bg-duo-greenLight text-duo-greenDark px-5 py-2 rounded-2xl border-2 border-duo-green border-b-4 font-black uppercase text-[11px] tracking-widest shadow-sm rotate-[-1deg]">
                      <Sparkles className="w-4 h-4 fill-current" /> #1 Scholarship RPG
                  </div>
                  
                  <h1 className="text-5xl md:text-8xl font-display font-black text-slate-800 leading-[0.9] tracking-tight">
                      Master your <br/>
                      <span className="text-duo-blue relative inline-block">
                          Future.
                          <svg className="absolute w-full h-4 -bottom-2 left-0 text-duo-blue/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                          </svg>
                      </span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-400 font-bold leading-relaxed max-w-xl mx-auto lg:mx-0">
                      Turn the boring scholarship process into an elite mission. Build your profile, battle AI bosses, and unlock the top 1% of opportunities.
                  </p>
                  
                  {/* HERO BUTTONS - ICONIC DUO STYLE */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                      <button 
                        onClick={onStart}
                        className="flex-1 sm:flex-none px-12 py-6 bg-duo-green hover:bg-duo-greenDark text-white rounded-[24px] font-black text-xl border-b-[10px] border-duo-greenDark active:border-b-0 active:translate-y-[10px] transition-all uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 group"
                      >
                          GET STARTED <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={4} />
                      </button>
                      
                      <button 
                        onClick={onGuest} 
                        className="flex-1 sm:flex-none px-12 py-6 bg-white hover:bg-slate-50 text-duo-blue rounded-[24px] font-black text-xl border-2 border-slate-200 border-b-[10px] active:border-b-2 active:translate-y-[8px] transition-all uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg"
                      >
                          <User className="w-6 h-6 stroke-[4px]" /> ENTER AS GUEST
                      </button>
                  </div>
              </div>

              {/* RIGHT: 3D FLOATING COMMAND INTERFACE */}
              <div className="relative h-[500px] w-full hidden lg:block perspective-1000 animate-in fade-in slide-in-from-right-12 duration-1000">
                  
                  {/* MAIN INTERFACE CARD - "THE COMMANDER" */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[520px] bg-white rounded-[48px] border-4 border-slate-200 border-b-[16px] shadow-[0_50px_100px_rgba(0,0,0,0.1)] rotate-y-[-15deg] rotate-x-[5deg] rotate-z-[-2deg] hover:rotate-y-0 transition-all duration-700 z-20 group overflow-hidden">
                      <div className="p-8 h-full flex flex-col">
                          <div className="flex justify-between items-center mb-8">
                              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center border-b-4 border-orange-200 shadow-sm">
                                  <Flame className="w-7 h-7 text-duo-orange fill-duo-orange animate-pulse" />
                              </div>
                              <div className="px-4 py-1.5 bg-slate-100 rounded-xl text-slate-400 font-black text-[10px] uppercase tracking-widest border-b-2 border-slate-200">LVL 24</div>
                          </div>
                          
                          <div className="flex-1 space-y-6">
                              <div className="bg-duo-blue p-5 rounded-3xl border-b-[8px] border-duo-blueDark text-white shadow-lg transform group-hover:scale-[1.02] transition-transform">
                                  <h4 className="font-black text-lg mb-1 uppercase tracking-tight italic">Daily Strike</h4>
                                  <p className="font-bold text-sky-100 text-[10px] uppercase">Submit 2 Essays</p>
                                  <div className="mt-4 w-full bg-black/20 h-2.5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                                      <div className="w-[85%] h-full bg-white rounded-full relative">
                                          <div className="absolute top-0 right-0 w-2 h-full bg-white/40 skew-x-12"></div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="bg-slate-50 border-2 border-slate-200 border-b-[6px] p-5 rounded-[28px] flex items-center gap-4 group/item hover:border-sky-300 transition-all">
                                  <div className="w-12 h-12 rounded-2xl bg-white border-b-4 border-slate-200 flex items-center justify-center text-slate-300 group-hover/item:text-duo-blue transition-colors shadow-sm">
                                      <Target size={24} strokeWidth={3} />
                                  </div>
                                  <div className="flex-1">
                                      <div className="h-2.5 w-24 bg-slate-200 rounded-full mb-2"></div>
                                      <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
                                  </div>
                              </div>

                              <div className="bg-slate-50 border-2 border-slate-200 border-b-[6px] p-5 rounded-[28px] flex items-center gap-4 group/item hover:border-purple-300 transition-all">
                                  <div className="w-12 h-12 rounded-2xl bg-white border-b-4 border-slate-200 flex items-center justify-center text-slate-300 group-hover/item:text-duo-purple transition-colors shadow-sm">
                                      <ShieldCheck size={24} strokeWidth={3} />
                                  </div>
                                  <div className="flex-1">
                                      <div className="h-2.5 w-20 bg-slate-200 rounded-full mb-2"></div>
                                      <div className="h-2 w-12 bg-slate-100 rounded-full"></div>
                                  </div>
                              </div>
                          </div>

                          <button className="w-full bg-duo-green text-white py-4 rounded-2xl font-black uppercase text-sm border-b-[6px] border-duo-greenDark mt-6 shadow-xl active:translate-y-1 active:border-b-2 transition-all">
                              CLAIM LOOT
                          </button>
                      </div>
                  </div>

                  {/* FLOATING 3D ICON ELEMENTS */}
                  {/* CROWN */}
                  <div className="absolute top-[5%] -right-12 bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[10px] shadow-2xl animate-bounce-slow z-30 transform rotate-12">
                      <Crown className="w-14 h-14 text-yellow-400 fill-yellow-400 drop-shadow-lg" strokeWidth={2.5} />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full border-4 border-white flex items-center justify-center text-white font-black text-[10px] shadow-md">1</div>
                  </div>

                  {/* GEM */}
                  <div className="absolute bottom-[10%] -left-12 bg-white p-6 rounded-[32px] border-2 border-slate-200 border-b-[10px] shadow-2xl animate-bounce-slow [animation-delay:1.5s] z-30 transform -rotate-12">
                      <Gem className="w-14 h-14 text-sky-400 fill-sky-400 drop-shadow-lg" strokeWidth={2.5} />
                  </div>

                  {/* SMALL XP BUBBLE */}
                  <div className="absolute top-[40%] -right-20 bg-[#58cc02] text-white px-5 py-3 rounded-2xl border-b-8 border-[#46a302] font-black text-xl shadow-2xl animate-pulse-slow z-[25] rotate-[-15deg]">
                      +100 XP
                  </div>

                  {/* BACKGROUND ORBS */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-duo-blue/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                  <div className="absolute bottom-0 right-0 w-80 h-80 bg-duo-green/5 rounded-full blur-[80px] pointer-events-none -z-10"></div>
              </div>
          </div>

          {/* MASCOT PEAKING FROM BOTTOM (Classic Duo Move) */}
          <div className="absolute bottom-0 right-[15%] hidden lg:block translate-y-1/2 hover:translate-y-0 transition-transform duration-700 z-50">
              <div className="w-48 h-48 relative">
                   <img 
                      src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=ninja&backgroundColor=b6e3f4" 
                      alt="Dojo Helper" 
                      className="w-full h-full object-contain drop-shadow-2xl"
                   />
                   <div className="absolute -top-4 left-0 bg-white p-3 rounded-2xl border-2 border-slate-200 border-b-4 shadow-xl">
                       <p className="text-[10px] font-black text-slate-700 leading-none">Psst! Ready?</p>
                   </div>
              </div>
          </div>
      </section>
  );
};
