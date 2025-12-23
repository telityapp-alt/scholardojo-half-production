import React from 'react';
import { GenericProgram } from '../core/contracts/entityMap';
import { DomainConfig } from '../core/contracts/domainConfig';
import { generateProgramTags } from '../core/engines/programTagEngine';
import { SuperTagBadge } from './SuperTagBadge';
import { DuoButton } from './DuoButton';
import { Briefcase, Building2, GraduationCap } from 'lucide-react';

interface ProgramCardProps {
  program: GenericProgram;
  config: DomainConfig;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, config }) => {
  // 1. ENGINE CALL
  // Component is blind to domain logic, it just asks the engine.
  const tags = generateProgramTags(program, config);
  
  // 2. THEME EXTRACTION
  const theme = config.programConfig.cardTheme;
  
  // 3. HOST ICON LOGIC (Generic)
  const HostIcon = config.id === 'student' ? GraduationCap : config.id === 'intern' ? Building2 : Briefcase;

  return (
    <div className={`
      group relative flex flex-col h-full
      bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px]
      hover:-translate-y-2 transition-all duration-200 ease-out
      hover:shadow-xl overflow-hidden
      active:border-b-2 active:translate-y-[6px]
    `}>
      
      {/* HERO: Gradient Background */}
      <div className={`h-28 bg-gradient-to-br ${theme.accentGradient} relative p-4 flex justify-between items-start`}>
         <div className="bg-white/90 backdrop-blur-sm p-2 rounded-xl border-b-4 border-slate-100 shadow-sm">
            <HostIcon className={`w-6 h-6 text-${theme.primaryColor}-500`} />
         </div>
         {/* Status Badge */}
         <div className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[10px] font-black uppercase tracking-widest">
            {program.status === 'coming_soon' ? 'Waitlist' : program.status}
         </div>
      </div>

      {/* BODY */}
      <div className="p-5 flex-1 flex flex-col space-y-4">
        
        {/* Title & Host */}
        <div>
          <h3 className="text-xl font-black text-slate-700 leading-tight group-hover:text-black mb-1">
            {program.title}
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
            {program.hostName}
          </p>
        </div>

        {/* Super Tags (Engine Output) */}
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <SuperTagBadge key={tag.id} tag={tag} />
          ))}
        </div>

        {/* Description */}
        <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-3 flex-1">
            {program.description}
        </p>

        {/* Action Area */}
        <div className="pt-4 mt-auto space-y-3">
             {/* Progress Bar (if active) */}
             {program.progress > 0 && (
                <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                        <span>{config.labels.tracker}</span>
                        <span>{program.progress}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full bg-${theme.primaryColor}-500 rounded-full transition-all duration-500`} 
                            style={{ width: `${program.progress}%` }} 
                        />
                    </div>
                </div>
             )}

            <DuoButton themeColor={config.theme} fullWidth>
                View {config.programConfig.entityLabel}
            </DuoButton>
        </div>
      </div>
    </div>
  );
};
