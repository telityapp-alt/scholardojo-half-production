
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { DomainType } from '../../../core/contracts/entityMap';
import { useProgramDetail } from '../hooks/useProgramLogic';
import { ChevronLeft, CheckCircle2, BookOpen, Zap, ArrowRight, DollarSign, MapPin, Shield, Users, Globe, Briefcase, Star, Building2, GraduationCap, Clock, Award, Target, Info } from 'lucide-react';
import { SourceSection } from '../../../components/shared/SourceSection';
import { DuoIcon, DuoColor } from '../../../components/ui/DuoIcon';
import { DuoButton } from '../../../components/DuoButton';
import { useLanguage } from '../../../core/hooks/useLanguage';
import { renderJuicyContent } from '../../../core/engines/contentRenderer';

export const ProgramDetail: React.FC = () => {
  const { domain, detailId } = useParams<{ domain: string; detailId: string }>();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  
  const domainEnum = Object.values(DomainType).find(d => d === domain) as DomainType;
  const config = domainEnum ? DOMAIN_CONFIGS[domainEnum] : DOMAIN_CONFIGS[DomainType.STUDENT];

  const { program, host, loading } = useProgramDetail(detailId, config);

  const getThemeClasses = (color: string) => {
      const themes: Record<string, any> = {
          green: { bg: 'bg-duo-green', border: 'border-duo-greenDark', text: 'text-duo-green', lightBg: 'bg-duo-greenLight', lightBorder: 'border-green-200' },
          blue: { bg: 'bg-duo-blue', border: 'border-duo-blueDark', text: 'text-duo-blue', lightBg: 'bg-duo-blueLight', lightBorder: 'border-blue-200' },
          purple: { bg: 'bg-duo-purple', border: 'border-duo-purpleDark', text: 'text-duo-purple', lightBg: 'bg-duo-purpleLight', lightBorder: 'border-purple-200' },
          orange: { bg: 'bg-duo-orange', border: 'border-orange-600', text: 'text-duo-orange', lightBg: 'bg-orange-50', lightBorder: 'border-orange-200' },
      };
      return themes[color] || themes.blue;
  };

  if (loading) return <div className="p-20 text-center font-black text-slate-300 animate-pulse uppercase tracking-widest">{t.common.loading}</div>;
  if (!program) return <div className="p-20 text-center font-black text-slate-300 uppercase tracking-widest">Program Not Found</div>;

  const themeClasses = getThemeClasses(config.theme);
  const duoColor = config.theme as DuoColor;

  const FallbackIcon = config.id === 'student' ? GraduationCap : config.id === 'intern' ? Building2 : Briefcase;

  return (
      <div className="animate-in slide-in-from-right duration-500 pb-20 max-w-6xl mx-auto px-4">
          
          <div className="mb-4">
              <DuoButton 
                  variant="navigation" 
                  startIcon={ChevronLeft}
                  onClick={() => navigate(`/${domain}/discovery/programs`)}
              >
                  {t.programDetail.backToPrograms}
              </DuoButton>
          </div>

          <div className={`relative ${themeClasses.bg} rounded-[32px] border-b-[10px] ${themeClasses.border} p-6 md:p-8 text-white overflow-hidden mb-8 shadow-xl group`}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  <div className="shrink-0 w-24 h-24 bg-white rounded-[24px] border-[4px] border-white/30 shadow-xl flex items-center justify-center p-4 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500 cursor-pointer" onClick={() => navigate(`/${domain}/discovery/hosts/${program.hostId}`)}>
                       {host?.logoUrl ? <img src={host.logoUrl} alt="Logo" className="w-full h-full object-contain" /> : <FallbackIcon className={`w-12 h-12 ${themeClasses.text}`} />}
                  </div>
                  <div className="text-center md:text-left flex-1 space-y-2">
                      <div className="inline-flex items-center gap-1.5 bg-black/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15">
                          <CheckCircle2 size={12} className="text-green-400" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/90">Campaign Active</span>
                      </div>
                      <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">{program.title}</h1>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                           <button onClick={() => navigate(`/${domain}/discovery/hosts/${program.hostId}`)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition-all font-bold text-xs">
                               <Building2 size={14}/> {host?.name}
                           </button>
                      </div>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-[28px] border-2 border-slate-200 border-b-[6px] p-6">
                      <div className="flex items-center gap-2.5 mb-4">
                          <DuoIcon icon={Info} color="gray" size="sm" />
                          <h3 className="font-black text-slate-700 text-sm uppercase tracking-wider">Overview</h3>
                      </div>
                      <p className="text-slate-500 font-bold leading-relaxed text-base">
                        {renderJuicyContent(program.description)}
                      </p>
                  </div>
                  <SourceSection sourceUrl={program.link} orgName={host?.name || 'Organizer'} title={program.title} />
              </div>
          </div>
      </div>
  );
};
