
import React, { useState } from 'react';
import { GenericProgram, GenericHost, SuperTag, DomainType } from '../../../core/contracts/entityMap';
import { DomainConfig } from '../../../core/contracts/domainConfig';
import { SuperTagBadge } from '../../../components/SuperTagBadge';
import { CheckCircle2, Clock, Briefcase, Building2, GraduationCap, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DuoIcon } from '../../../components/ui/DuoIcon';
import { DuoButton } from '../../../components/DuoButton';
import { SaveService } from '../../../core/access/saveAccess';

interface ProgramCardProps {
  program: GenericProgram & { generatedTags: SuperTag[] };
  host?: GenericHost;
  config: DomainConfig;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, host, config }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(() => SaveService.isSaved(program.id));

  const isPrestige = program.tier === 'mythic';
  const isOpen = program.status === 'open';

  const statusTag = program.generatedTags.find(t => t.variant === 'urgency');
  const footerTags = program.generatedTags.filter(t => t.variant !== 'urgency');

  const FallbackIcon = config.id === 'student' ? GraduationCap : config.id === 'intern' ? Building2 : Briefcase;
  const themeColor = config.theme;

  const themeHoverMap: Record<string, string> = {
      green: 'hover:border-green-300 hover:border-b-green-500 group-hover:text-green-600',
      blue: 'hover:border-blue-300 hover:border-b-blue-500 group-hover:text-blue-600',
      purple: 'hover:border-purple-300 hover:border-b-purple-500 group-hover:text-purple-600',
  };

  const standardHover = themeHoverMap[themeColor] || themeHoverMap['green'];

  const cardStyle = isPrestige
      ? 'border-sky-200 border-b-sky-400 bg-sky-50/40 hover:border-sky-400 hover:border-b-sky-500 hover:bg-sky-50'
      : `border-slate-200 border-b-slate-300 bg-white ${standardHover}`;

  const textColorClass = !isPrestige ? (themeHoverMap[themeColor]?.split(' ').pop() || '') : 'text-slate-700';

  const handleSave = (e: React.MouseEvent) => {
      e.stopPropagation();
      const saved = SaveService.toggle(program, 'PROGRAM', config.id);
      setIsSaved(saved);
  };

  return (
      <div 
          onClick={() => navigate(`/${config.id}/discovery/programs/${program.id}`)}
          className={`
              group rounded-[32px] border-2 border-b-[8px] p-6 cursor-pointer 
              hover:-translate-y-1 hover:border-b-[12px] 
              active:border-b-2 active:translate-y-[6px] 
              transition-all flex flex-col h-full relative overflow-hidden
              ${cardStyle}
          `}
      >
          <div className="flex justify-between items-start mb-6 relative z-10">
              {host?.logoUrl ? (
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 border-b-4 flex items-center justify-center shadow-sm overflow-hidden p-2">
                       <img src={host.logoUrl} alt={host.name} className="w-full h-full object-contain" />
                  </div>
              ) : (
                  <DuoIcon 
                    icon={FallbackIcon} 
                    color={config.programConfig.cardTheme.primaryColor as any} 
                    size="xl" 
                    className="bg-white border-slate-200"
                  />
              )}
              
              <div className="flex flex-col items-end gap-2">
                  <button 
                    onClick={handleSave}
                    className={`p-3 rounded-xl border-2 border-b-4 transition-all active:border-b-0 active:translate-y-[4px] ${isSaved ? 'bg-pink-100 border-pink-200 text-pink-500 shadow-sm' : 'bg-white border-slate-100 text-slate-300 hover:text-pink-400'}`}
                  >
                      <Heart size={20} fill={isSaved ? "currentColor" : "none"} strokeWidth={3} />
                  </button>
                  <div className={`
                      flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-b-2 text-[10px] font-bold tracking-wide
                      ${isOpen ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}
                  `}>
                      {isOpen ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {program.status === 'coming_soon' ? 'Waitlist' : program.status.replace('_', ' ')}
                  </div>
              </div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
              <h3 className={`text-2xl font-bold text-slate-700 mb-2 transition-colors ${textColorClass}`}>
                  {program.title}
              </h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 mt-2 line-clamp-2">
                  {program.description}
              </p>

              <div className="mt-auto pt-4">
                  <DuoButton 
                    variant="primary" 
                    themeColor={config.theme} 
                    fullWidth 
                    onClick={(e) => { e.stopPropagation(); navigate(`/${config.id}/discovery/programs/${program.id}`); }}
                  >
                     View {config.programConfig.entityLabel}
                  </DuoButton>
              </div>
          </div>

          <div className={`flex flex-wrap gap-2 relative z-10 pt-6 border-t-2 mt-6 ${isPrestige ? 'border-sky-100' : 'border-slate-50'}`}>
              {footerTags.slice(0, 3).map((tag, i) => (
                  <SuperTagBadge key={i} tag={tag} />
              ))}
              {statusTag && <SuperTagBadge tag={statusTag} />}
          </div>
      </div>
  );
};
