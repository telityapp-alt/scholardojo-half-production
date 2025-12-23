
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from './components/Hero';
import { SocialProof } from './components/SocialProof';
import { Features } from './components/Features';
import { WorkspacePreview } from './components/WorkspacePreview';
import { Gamification } from './components/Gamification';
import { AppPreviewSection } from './components/AppPreviewSection';
import { QuestSection, RoadmapSection, CalendarSection } from './components/FeatureShowcase';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { LanguageSwitcher } from '../../components/navigation/LanguageSwitcher';
import { RegionSwitcher } from '../../components/navigation/RegionSwitcher';

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => navigate('/scholar/workspace/home');
    const handleLogin = () => navigate('/scholar/workspace/home');
    const handleGuest = () => navigate('/scholar/discovery/programs');

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-duo-greenLight overflow-x-hidden">
            
            {/* COMPACT STICKY NAV */}
            <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b-2 border-slate-200 px-6 py-3">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    
                    {/* DUO STYLE LOGO */}
                    <div 
                        className="flex items-center gap-2 group cursor-pointer select-none" 
                        onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
                    >
                        <span className="font-display text-3xl font-black tracking-tighter text-duo-green lowercase leading-none pt-1">
                            scholar<span className="text-duo-blue">dojo</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2">
                            <LanguageSwitcher />
                            <RegionSwitcher />
                        </div>
                        <button 
                            onClick={handleLogin}
                            className="bg-white border-2 border-slate-200 border-b-4 px-5 py-2 rounded-2xl font-black text-[12px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 active:border-b-0 active:translate-y-[4px] transition-all"
                        >
                            LOGIN
                        </button>
                    </div>
                </div>
            </nav>

            <div className="pt-16">
                <Hero onStart={handleStart} onLogin={handleLogin} onGuest={handleGuest} />
                <SocialProof />
                <Features onStart={handleStart} />
                <WorkspacePreview />
                <Gamification />
                <AppPreviewSection onTriggerAuth={handleStart} />
                <QuestSection />
                <RoadmapSection />
                <CalendarSection />
                <FAQ />
                <Footer onStart={handleStart} />
            </div>
        </div>
    );
};
