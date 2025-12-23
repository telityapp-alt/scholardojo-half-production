
import React, { useState, useEffect, useMemo } from 'react';
import { UnifiedProgram } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart, Clock, ShieldCheck, Hash } from 'lucide-react';
import { SaveService } from '../../../core/access/saveAccess';
import { DomainType } from '../../../core/contracts/entityMap';
import { processSmartTags } from '../../../core/engines/aiTagEngine';
import { SuperTagBadge } from '../../../components/SuperTagBadge';

export const ProgramCard: React.FC<{ program: UnifiedProgram }> = ({ program }) => {
    const navigate = useNavigate();
    const { domain } = useParams();
    const domainEnum = (domain as DomainType) || DomainType.STUDENT;
    const [isSaved, setIsSaved] = useState(false);

    const smartTags = useMemo(() => processSmartTags(domainEnum, {
        title: program.title,
        description: program.intel.description,
        fullDescription: program.intel.highlights.join(' '),
        deadline: program.deadline,
        price: program.type.toLowerCase().includes('paid') ? 100 : 0
    }), [domainEnum, program]);

    useEffect(() => {
        setIsSaved(SaveService.isSaved(program.id));
    }, [program.id]);

    const handleSave = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsSaved(SaveService.toggle(program, 'PROGRAM', domainEnum));
    };

    const deadlineDate = new Date(program.deadline);
    const now = new Date();
    const daysLeft = Math.max(0, Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
    const isUrgent = daysLeft < 30;

    return (
        <div 
            onClick={() => navigate(`/${domain}/discovery/programs/${program.id}`)}
            className="group bg-white rounded-[28px] border-2 border-slate-200 border-b-[8px] hover:border-sky-400 hover:border-b-sky-600 transition-all active:translate-y-[4px] active:border-b-2 overflow-hidden flex flex-col h-full shadow-sm"
        >
            <div className="aspect-[2/1] relative overflow-hidden bg-slate-100">
                <img 
                    src={program.intel.description.includes('AI') ? 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000' : 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    alt="" 
                />
                <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-md text-white px-2 py-1 rounded-lg flex items-center gap-1 border border-white/20 shadow-lg">
                    <Hash size={9} className="text-sky-400 stroke-[4px]" />
                    <span className="text-[9px] font-black tracking-widest">{program.id.slice(-3).toUpperCase()}</span>
                </div>
                <button 
                    onClick={handleSave}
                    className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-xl border-b-4 transition-all active:translate-y-1 active:border-b-0 flex items-center justify-center
                        ${isSaved ? 'bg-pink-500 border-pink-700 text-white' : 'bg-white/90 border-slate-200 text-slate-300 hover:text-pink-500'}
                    `}
                >
                    <Heart size={16} fill={isSaved ? "currentColor" : "none"} strokeWidth={3} />
                </button>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-white border-2 border-slate-100 p-1 shadow-sm shrink-0">
                        <img src={program.organizerLogo} className="w-full h-full object-contain" alt="" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-sm font-black text-slate-700 leading-tight truncate group-hover:text-sky-600 transition-colors">
                            {program.title}
                        </h3>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest truncate leading-none">{program.organizer}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-6">
                    {smartTags.slice(0, 3).map((tag) => (
                        <SuperTagBadge key={tag.id} tag={tag} />
                    ))}
                </div>

                <div className="mt-auto pt-3 border-t-2 border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                            <span className="text-[7px] font-black uppercase text-slate-300 tracking-widest">End</span>
                            <div className="flex items-center gap-1">
                                <Clock size={10} className={isUrgent ? 'text-red-500' : 'text-slate-400'} strokeWidth={3} />
                                <span className={`text-[10px] font-black ${isUrgent ? 'text-red-500' : 'text-slate-700'}`}>
                                    {daysLeft}D
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-2 py-1 rounded-lg text-slate-400 font-black text-[8px] uppercase tracking-widest border border-slate-100">
                        Details
                    </div>
                </div>
            </div>
        </div>
    );
};
