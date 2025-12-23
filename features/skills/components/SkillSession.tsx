
import React, { useState, useEffect } from 'react';
import { SkillStep, SkillQuestion, ContentBlock } from '../types';
import { X, Heart, CheckCircle2, AlertCircle, Volume2, ArrowRight, Play, BookOpen, Star, Sparkles, ChevronRight, FileText, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { renderJuicyContent } from '../../../core/engines/contentRenderer';

interface SkillSessionProps {
    skillId: string;
    step: SkillStep;
    onClose: () => void;
    onComplete: () => void;
}

export const SkillSession: React.FC<SkillSessionProps> = ({ skillId, step, onClose, onComplete }) => {
    // Session State
    const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
    const [isQuizPhase, setIsQuizPhase] = useState(false);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);
    const [lives, setLives] = useState(5);
    const [isFinished, setIsFinished] = useState(false);

    const totalSteps = step.slides.length + step.questions.length;
    const progressPercent = ((currentSlideIdx + (isQuizPhase ? step.slides.length + currentQuestionIdx : 0)) / totalSteps) * 100;

    const handleNextSlide = () => {
        if (currentSlideIdx < step.slides.length - 1) {
            setCurrentSlideIdx(prev => prev + 1);
        } else {
            setIsQuizPhase(true);
        }
    };

    const handleCheck = () => {
        if (!selectedOption) return;
        const q = step.questions[currentQuestionIdx];
        const isCorrect = selectedOption === q.correctAnswer;
        
        if (isCorrect) {
            setFeedback('CORRECT');
            // Sound: 'Ding' logic would go here
        } else {
            setFeedback('WRONG');
            setLives(prev => Math.max(0, prev - 1));
            // Haptic vibration or shake animation logic
        }
    };

    const handleContinue = () => {
        if (feedback === 'CORRECT') {
            const nextIdx = currentQuestionIdx + 1;
            if (nextIdx < step.questions.length) {
                setCurrentQuestionIdx(nextIdx);
                setSelectedOption(null);
                setFeedback(null);
            } else {
                handleSuccess();
            }
        } else {
            // Re-try wrong answer
            setSelectedOption(null);
            setFeedback(null);
        }
    };

    const handleSuccess = () => {
        setIsFinished(true);
        confetti({ 
            particleCount: 150, 
            spread: 70, 
            origin: { y: 0.6 }, 
            colors: ['#58cc02', '#1cb0f6', '#fbbf24'] 
        });
    };

    // --- RENDER SLIDE (Teaching) ---
    const renderIntelSlide = (slide: ContentBlock) => {
        return (
            <div className="flex flex-col items-center max-w-2xl mx-auto space-y-8 animate-in slide-in-from-right duration-500 pb-20">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-16 h-16 bg-[#1cb0f6] rounded-2xl flex items-center justify-center text-white border-b-4 border-sky-700 shadow-lg">
                        {slide.type === 'TEXT' ? <BookOpen size={32} /> : slide.type === 'IMAGE' ? <Sparkles size={32} /> : <Video size={32} />}
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 leading-tight">{slide.title || 'Lesson Slide'}</h2>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Learning Phase • Slide {currentSlideIdx + 1}</p>
                    </div>
                </div>

                <div className="w-full bg-white rounded-[40px] border-2 border-slate-200 border-b-[12px] p-8 md:p-12 shadow-sm space-y-6">
                    {slide.type === 'TEXT' && (
                        <p className="text-xl md:text-2xl font-bold text-slate-600 leading-relaxed italic">
                            {renderJuicyContent(slide.content)}
                        </p>
                    )}
                    
                    {slide.type === 'IMAGE' && (
                        <div className="rounded-[32px] overflow-hidden border-4 border-slate-100 shadow-xl">
                            <img src={slide.content} className="w-full h-auto" alt="Instructional" />
                        </div>
                    )}

                    {slide.type === 'VIDEO' && (
                        <div className="rounded-[32px] overflow-hidden border-4 border-slate-100 shadow-xl bg-slate-900 aspect-video">
                            <video src={slide.content} controls className="w-full h-full object-cover" />
                        </div>
                    )}

                    {slide.description && (
                        <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
                            <p className="text-sm font-bold text-slate-400 italic">Sensei says: {slide.description}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // --- RENDER QUIZ (Testing) ---
    const renderQuizSlide = () => {
        const q = step.questions[currentQuestionIdx];
        return (
            <div className="flex flex-col items-center max-w-2xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 text-center leading-tight">
                    {q.question}
                </h2>

                <div className="grid grid-cols-1 gap-4 w-full">
                    {q.options.map((opt, i) => {
                        const isSelected = selectedOption === opt;
                        return (
                            <button 
                                key={i}
                                onClick={() => !feedback && setSelectedOption(opt)}
                                disabled={!!feedback}
                                className={`
                                    w-full p-6 rounded-2xl border-2 border-b-[6px] text-left transition-all duration-100 flex items-center gap-4 group
                                    ${isSelected 
                                        ? 'bg-sky-50 border-sky-400 text-sky-700 border-b-sky-600 scale-[1.02]' 
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 active:border-b-2 active:translate-y-[4px]'}
                                `}
                            >
                                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center font-black text-sm transition-colors ${isSelected ? 'bg-sky-500 border-sky-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:border-slate-200'}`}>
                                    {i + 1}
                                </div>
                                <span className="font-bold text-lg">{opt}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    // --- RENDER SUCCESS ---
    if (isFinished) return (
        <div className="fixed inset-0 z-[600] bg-white flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
             <div className="relative">
                <div className="w-56 h-56 bg-[#58cc02] rounded-[64px] border-b-[20px] border-[#46a302] flex items-center justify-center text-white shadow-2xl animate-bounce">
                    <Star size={110} fill="currentColor" />
                </div>
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 w-20 h-20 rounded-full border-8 border-white flex items-center justify-center font-black text-2xl shadow-lg rotate-12">
                    +{step.xpReward}
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-6xl font-black text-[#58cc02] tracking-tighter uppercase italic">EPIC WIN!</h2>
                <p className="text-slate-400 font-bold text-2xl uppercase tracking-widest mt-2">Dojo Step Mastered</p>
            </div>
            <button 
                onClick={onComplete}
                className="bg-[#58cc02] text-white px-12 py-6 rounded-[32px] font-black text-2xl border-b-[12px] border-[#46a302] hover:brightness-110 active:border-b-0 active:translate-y-[12px] transition-all flex items-center gap-4 shadow-xl uppercase tracking-widest"
            >
                CONTINUE <ArrowRight size={32} strokeWidth={4} />
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[500] bg-[#f7f7f7] flex flex-col animate-in fade-in duration-300">
            {/* TOP PROGRESS BAR */}
            <div className="max-w-5xl mx-auto w-full px-6 py-10 flex items-center gap-6 shrink-0">
                <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                    <X size={36} strokeWidth={4} />
                </button>
                <div className="flex-1 h-5 bg-slate-200 rounded-full overflow-hidden border-2 border-slate-200">
                    <div 
                        className="h-full bg-[#58cc02] transition-all duration-700 ease-out relative" 
                        style={{ width: `${progressPercent}%` }}
                    >
                        <div className="absolute top-0 right-0 w-4 h-full bg-white/30 skew-x-12"></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border-2 border-slate-200 border-b-4">
                    <Heart size={24} className="text-red-500 fill-red-500" />
                    <span className="font-black text-red-500 text-xl">{lives}</span>
                </div>
            </div>

            {/* MAIN AREA */}
            <div className="flex-1 overflow-y-auto px-6 pt-8">
                {!isQuizPhase ? renderIntelSlide(step.slides[currentSlideIdx]) : renderQuizSlide()}
            </div>

            {/* BOTTOM STICKY FOOTER */}
            <div className={`
                p-8 shrink-0 transition-all duration-500 border-t-4
                ${feedback === 'CORRECT' ? 'bg-[#d7ffb8] border-[#58cc02]' : feedback === 'WRONG' ? 'bg-[#ffdfe0] border-[#ff4b4b]' : 'bg-white border-slate-100'}
            `}>
                <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        {feedback === 'CORRECT' && (
                            <>
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#58cc02] shadow-sm border-b-4 border-slate-100"><CheckCircle2 size={48} strokeWidth={4} /></div>
                                <div>
                                    <h4 className="text-3xl font-black text-[#46a302]">Nice!</h4>
                                    <p className="text-[#58cc02] font-bold text-lg">Your strike was perfect.</p>
                                </div>
                            </>
                        )}
                        {feedback === 'WRONG' && (
                            <>
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#ff4b4b] shadow-sm border-b-4 border-slate-100"><AlertCircle size={48} strokeWidth={4} /></div>
                                <div>
                                    <h4 className="text-3xl font-black text-[#ea2b2b]">Wrong Answer!</h4>
                                    <p className="text-[#ff4b4b] font-bold text-lg">Check the intel again.</p>
                                </div>
                            </>
                        )}
                        {!feedback && (
                            <div className="hidden md:block">
                                <p className="text-slate-300 font-black text-[12px] uppercase tracking-[0.4em]">Strike Preparation Active</p>
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-auto">
                        {!isQuizPhase ? (
                            <button 
                                onClick={handleNextSlide}
                                className="w-full md:w-72 bg-[#1cb0f6] text-white px-10 py-5 rounded-[24px] font-black text-2xl border-b-[8px] border-sky-700 hover:brightness-110 active:border-b-0 active:translate-y-[8px] transition-all flex items-center justify-center gap-3 shadow-lg"
                            >
                                CONTINUE <ChevronRight size={28} strokeWidth={4} />
                            </button>
                        ) : (
                            <button 
                                onClick={feedback ? handleContinue : handleCheck}
                                disabled={!selectedOption && !feedback}
                                className={`
                                    w-full md:w-72 px-10 py-5 rounded-[24px] font-black text-2xl border-b-[8px] transition-all uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg
                                    ${!selectedOption && !feedback 
                                        ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed border-b-[8px]' 
                                        : feedback === 'CORRECT'
                                        ? 'bg-[#58cc02] text-white border-[#46a302] hover:brightness-110'
                                        : feedback === 'WRONG'
                                        ? 'bg-[#ff4b4b] text-white border-[#ea2b2b] hover:brightness-110'
                                        : 'bg-[#58cc02] text-white border-[#46a302] hover:brightness-110 active:border-b-0 active:translate-y-[8px]'
                                    }
                                `}
                            >
                                {feedback ? 'CONTINUE' : 'CHECK'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
