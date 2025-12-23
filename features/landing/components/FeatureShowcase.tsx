
import React, { useRef, useEffect } from 'react';
import { QuestView } from '../../quest/components/QuestView';
import { CurriculumView } from '../../curriculum/components/CurriculumView';
import { PlanView } from '../../plan/components/PlanView';
import { ArrowDown, Zap, Map, Calendar as CalIcon } from 'lucide-react';

const FeatureWrapper = ({ 
    children, 
    fadeFrom = "from-slate-50" 
}: { 
    children?: React.ReactNode, 
    fadeFrom?: string 
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current;
            scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
        }
    }, []);

    return (
        <div className="relative w-full h-[600px] group select-none cursor-grab active:cursor-grabbing">
            <div className={`absolute top-0 left-0 bottom-0 w-24 md:w-40 bg-gradient-to-r ${fadeFrom} to-transparent z-20 pointer-events-none`}></div>
            <div className={`absolute top-0 right-0 bottom-0 w-24 md:w-40 bg-gradient-to-l ${fadeFrom} to-transparent z-20 pointer-events-none`}></div>
            <div 
                ref={scrollRef}
                className="w-full h-full overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            >
                 <div className="min-w-[1100px] h-full py-4 px-8 md:px-12">
                     {children}
                 </div>
            </div>
        </div>
    );
};

export const QuestSection = () => {
    return (
        <section className="py-24 md:py-32 px-0 md:px-6 bg-slate-50 border-b-4 border-slate-200 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 w-full relative">
                    <div className="absolute inset-0 bg-sky-400/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <FeatureWrapper fadeFrom="from-slate-50">
                        <div className="pointer-events-none grayscale opacity-80 scale-90 origin-center translate-y-10">
                            <QuestView />
                        </div>
                    </FeatureWrapper>
                </div>
                <div className="order-1 lg:order-2 space-y-8 px-6 lg:px-0">
                    <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-600 px-4 py-2 rounded-full border-2 border-sky-200 font-black uppercase text-xs tracking-widest">
                        <Zap className="w-4 h-4 fill-sky-600" /> Kan-ban Board
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-800 leading-[0.95] tracking-tight">
                        Turn chaos into <span className="text-sky-500">Quests.</span>
                    </h2>
                    <p className="text-xl font-bold text-slate-400 leading-relaxed">
                        Stop using boring spreadsheets. Drag, drop, and complete tasks like an RPG. Every document submitted is XP earned.
                    </p>
                    <ul className="space-y-4">
                        {['Visual Progress Tracking', 'Deadline Alerts', 'Subtask Breakdowns'].map(item => (
                            <li key={item} className="flex items-center gap-3 font-black text-slate-700 text-lg">
                                <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-sm border-b-4 border-sky-700">
                                    <ArrowDown className="w-5 h-5" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export const RoadmapSection = () => {
    return (
        <section className="py-24 md:py-32 px-0 md:px-6 bg-white border-b-4 border-slate-200 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 px-6 lg:px-0">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full border-2 border-purple-200 font-black uppercase text-xs tracking-widest">
                        <Map className="w-4 h-4 fill-purple-600" /> Strategy Maps
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-800 leading-[0.95] tracking-tight">
                        Never get <span className="text-purple-500">lost</span> again.
                    </h2>
                    <p className="text-xl font-bold text-slate-400 leading-relaxed">
                        We don't just give you a list. We give you a step-by-step GPS for specific scholarships like Chevening and Fulbright.
                    </p>
                    <ul className="space-y-4">
                        {['Unlockable Levels', 'Boss Battles (Interviews)', 'Hidden Rewards'].map(item => (
                            <li key={item} className="flex items-center gap-3 font-black text-slate-700 text-lg">
                                <div className="w-8 h-8 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-sm border-b-4 border-purple-700">
                                    <ArrowDown className="w-5 h-5" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full relative">
                    <div className="absolute inset-0 bg-purple-400/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <FeatureWrapper fadeFrom="from-white">
                        <div className="pointer-events-none grayscale opacity-80 scale-90 origin-center translate-y-10">
                            <CurriculumView />
                        </div>
                    </FeatureWrapper>
                </div>
            </div>
        </section>
    );
};

export const CalendarSection = () => {
    return (
        <section className="py-24 md:py-32 px-0 md:px-6 bg-slate-50 border-b-4 border-slate-200 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 w-full relative">
                    <div className="absolute inset-0 bg-pink-400/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <FeatureWrapper fadeFrom="from-slate-50">
                        <div className="pointer-events-none grayscale opacity-80 scale-90 origin-center translate-y-10">
                            <PlanView />
                        </div>
                    </FeatureWrapper>
                </div>
                <div className="order-1 lg:order-2 space-y-8 px-6 lg:px-0">
                    <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full border-2 border-pink-200 font-black uppercase text-xs tracking-widest">
                        <CalIcon className="w-4 h-4 fill-pink-600" /> Master Plan
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-800 leading-[0.95] tracking-tight">
                        Own your <span className="text-pink-500">Timeline.</span>
                    </h2>
                    <p className="text-xl font-bold text-slate-400 leading-relaxed">
                        Sync your deadlines, events, and personal quests in one master view. Miss nothing. Win everything.
                    </p>
                    <ul className="space-y-4">
                        {['Auto-synced Deadlines', 'Event Integration', 'Daily Focus Mode'].map(item => (
                            <li key={item} className="flex items-center gap-3 font-black text-slate-700 text-lg">
                                <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center text-white shadow-sm border-b-4 border-pink-700">
                                    <ArrowDown className="w-5 h-5" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
