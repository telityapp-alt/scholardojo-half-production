import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, Heart, MapPin, Trophy } from 'lucide-react';
import { GenericHost } from '../../../../core/contracts/entityMap';
import { DuoButton } from '../../../../components/DuoButton';
import { useNavigate } from 'react-router-dom';
import { DuoIcon } from '../../../../components/ui/DuoIcon';

interface HostHeroProps {
    host: GenericHost;
    domain: string;
}

export const HostHero: React.FC<HostHeroProps> = ({ host, domain }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            {/* Navigation */}
            <div className="mb-6">
                <DuoButton 
                    variant="navigation" 
                    startIcon={ChevronLeft}
                    onClick={() => navigate(`/${domain}/discovery/hosts`)}
                >
                    Back to Dex
                </DuoButton>
            </div>

            {/* Hero Card */}
            <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] overflow-hidden mb-8">
                 {/* Image Area */}
                 <div className="h-[300px] w-full relative bg-slate-200 group">
                     {host.detailImage && (
                        <img 
                            src={host.detailImage} 
                            alt={host.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                     
                     {/* Solid Badges Overlay */}
                     <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                         {host.rank && (
                            <div className="bg-white px-4 py-2 rounded-xl border-2 border-slate-200 border-b-4 shadow-sm flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="font-black text-slate-700 text-sm">Rank #{host.rank}</span>
                            </div>
                         )}
                         {host.tags && host.tags[0] && (
                            <div className="bg-white px-4 py-2 rounded-xl border-2 border-slate-200 border-b-4 shadow-sm">
                                <span className={`font-black text-sm text-slate-600 uppercase tracking-wider`}>{host.tags[0]}</span>
                            </div>
                         )}
                     </div>
                 </div>
                 
                 {/* Header Content */}
                 <div className="p-8 relative">
                     <div className="flex flex-col md:flex-row items-end justify-between gap-6 -mt-16 relative z-10">
                         <div className="flex items-end gap-6">
                             <div className="w-32 h-32 bg-white rounded-3xl p-2 flex items-center justify-center shadow-lg border-2 border-slate-200 border-b-[6px]">
                                 <img src={host.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-2xl" />
                             </div>
                             <div className="pb-2">
                                 <h1 className="text-4xl md:text-5xl font-black text-slate-700 tracking-tight mb-2 leading-none">{host.name}</h1>
                                 <div className="flex items-center gap-2 text-slate-400 font-bold text-lg">
                                     <MapPin className="w-5 h-5 stroke-[2.5]" /> 
                                     {host.location}
                                 </div>
                             </div>
                         </div>
                         
                         <div className="flex gap-3 w-full md:w-auto items-center">
                             <DuoButton 
                                variant="secondary"
                                themeColor="slate"
                                startIcon={Heart}
                                onClick={() => setIsSaved(!isSaved)}
                                className={isSaved ? '!text-red-500 !border-red-200' : ''}
                             >
                                 {isSaved ? 'Saved' : 'Save'}
                             </DuoButton>

                             <DuoButton 
                                variant="primary"
                                themeColor={domain === 'intern' ? 'orange' : domain === 'scholar' ? 'blue' : 'green'}
                                endIcon={ArrowRight}
                                onClick={() => setHasApplied(true)}
                                disabled={hasApplied}
                             >
                                 {hasApplied ? 'Connected' : 'Connect'}
                             </DuoButton>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};