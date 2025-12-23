
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CurriculumService } from '../services/curriculumService';
import { CurriculumMaster, CurriculumChapter } from '../types';
import { ChevronLeft, Book, CheckCircle2, Lock, Trophy, Zap, Sparkles } from 'lucide-react';
import { DuoButton } from '../../../components/DuoButton';
import { DuoIcon } from '../../../components/ui/DuoIcon';
import { useLanguage } from '../../../core/hooks/useLanguage';
import { renderJuicyContent } from '../../../core/engines/contentRenderer';

interface CurriculumDetailProps {
    injectedId?: string; // For use inside ProgramDetail
    hideHeader?: boolean;
}

export const CurriculumDetail: React.FC<CurriculumDetailProps> = ({ injectedId, hideHeader = false }) => {
    const { detailId } = useParams<{ detailId: string }>();
    const navigate = useNavigate();
    const { t, lang } = useLanguage();
    
    const targetId = injectedId || detailId;
    const [curriculum, setCurriculum] = useState<CurriculumMaster | null>(null);
    const [activeChapter, setActiveChapter] = useState<CurriculumChapter | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!targetId) return;
        setLoading(true);
        // We sync from the CurriculumService which now maps from Unified Programs
        const data = CurriculumService.getById(targetId, lang);
        if (data) {
            setCurriculum(data);
            if (data.units[0]?.chapters[0]) setActiveChapter(data.units[0].chapters[0]);
        }
        setLoading(false);
    }, [targetId, lang]);

    if (loading) return <div className="p-20 text-center animate-pulse font-black text-slate-300">Syncing Academy Data...</div>;
    if (!curriculum) return <div className="p-20 text-center font-black text-slate-300">No Curriculum Intel Found.</div>;

    return (
        <div className={`animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto ${hideHeader ? '' : 'px-4'}`}>
            {!hideHeader && (
                <div className="flex items-center justify-between mb-6">
                    <DuoButton variant="navigation" startIcon={ChevronLeft} onClick={() => navigate(-1)}>
                        {t.common.back}
                    </DuoButton>
                    <div className="bg-white px-3 py-1.5 rounded-xl border-2 border-slate-200 border-b-4 flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.curriculum.mastery}: 0%</span>
                    </div>
                </div>
            )}

            {!hideHeader && (
                <div className="bg-slate-800 rounded-[40px] border-b-[12px] border-slate-950 p-8 md:p-12 text-white relative overflow-hidden mb-10 group shadow-xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10 z-0 mix-blend-overlay"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 bg-white rounded-3xl border-b-[8px] border-slate-200 flex items-center justify-center p-5 transform rotate-2 group-hover:rotate-0 transition-transform shadow-xl">
                            <Book size={48} className="text-slate-800" strokeWidth={2.5} />
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">{curriculum.title}</h1>
                            <p className="text-base md:text-lg font-bold text-slate-400 mt-2">{curriculum.subtitle}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Units List */}
                <div className="lg:col-span-4 space-y-6">
                    {curriculum.units.map((unit) => (
                        <div key={unit.id} className="space-y-3">
                            <h3 className="font-black text-slate-400 uppercase tracking-widest text-[10px] px-2">{unit.title}</h3>
                            {unit.chapters.map((chapter) => {
                                const isActive = activeChapter?.id === chapter.id;
                                return (
                                    <button 
                                        key={chapter.id}
                                        onClick={() => setActiveChapter(chapter)}
                                        className={`w-full text-left p-4 rounded-2xl border-2 border-b-[5px] transition-all flex items-center gap-4 ${isActive ? 'bg-sky-50 border-sky-400 border-b-sky-600' : 'bg-white border-slate-200 hover:border-sky-300'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-b-[3px] ${isActive ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            <DuoIcon icon={Zap} color={isActive ? 'sky' : 'gray'} size="sm" />
                                        </div>
                                        <span className={`font-black text-sm ${isActive ? 'text-sky-700' : 'text-slate-700'}`}>{chapter.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Chapter Panel */}
                <div className="lg:col-span-8">
                    {activeChapter ? (
                        <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-6 md:p-10 space-y-8 animate-in slide-in-from-bottom-2 shadow-lg">
                            <h2 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight">{activeChapter.title}</h2>
                            <div className="space-y-6">
                                {activeChapter.points.map((p) => (
                                    <div key={p.id} className="p-6 rounded-[24px] border-2 border-b-[6px] bg-slate-50 border-slate-200">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Zap size={18} className="text-orange-500" />
                                            <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-500">{p.title}</h5>
                                        </div>
                                        <p className="text-base font-bold text-slate-700 leading-relaxed">{renderJuicyContent(p.content)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[40px] border-2 border-slate-200 border-dashed p-20 text-center text-slate-300 font-black">Select Lesson</div>
                    )}
                </div>
            </div>
        </div>
    );
};
