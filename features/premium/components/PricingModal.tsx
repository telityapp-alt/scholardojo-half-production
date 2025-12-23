
import React, { useState } from 'react';
import { X, Check, Zap, Crown, Globe, Lock, Star, Infinity } from 'lucide-react';
import { DomainType } from '../../../core/contracts/entityMap';
import { DuoButton } from '../../../components/DuoButton';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { ThemeEngine } from '../../../core/engines/themeEngine';

interface PricingModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentDomain: DomainType;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose, currentDomain }) => {
    const [billing, setBilling] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');

    if (!isOpen) return null;

    // Use centralized config and branding instead of switch logic
    const config = DOMAIN_CONFIGS[currentDomain];
    const branding = ThemeEngine.getBranding(currentDomain);
    
    const domainLabel = currentDomain.charAt(0).toUpperCase() + currentDomain.slice(1);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>

            {/* Modal Container */}
            <div className="relative w-full max-w-5xl bg-white rounded-[40px] border-4 border-slate-200 border-b-[10px] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
                
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-2xl flex items-center justify-center transition-all border-b-4 border-slate-300 active:border-b-0 active:translate-y-[4px]"
                >
                    <X className="w-6 h-6 stroke-[3px]" />
                </button>

                {/* Header */}
                <div className="text-center pt-10 pb-6 px-4">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-700 mb-4">
                        Unlock Your Full Potential
                    </h2>
                    
                    {/* Billing Toggle */}
                    <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl border-2 border-slate-200">
                        <button 
                            onClick={() => setBilling('MONTHLY')}
                            className={`px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                                billing === 'MONTHLY' 
                                ? 'bg-white text-slate-700 shadow-sm border-2 border-slate-200' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setBilling('YEARLY')}
                            className={`px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all relative ${
                                billing === 'YEARLY' 
                                ? 'bg-white text-slate-700 shadow-sm border-2 border-slate-200' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            Yearly
                            <span className="absolute -top-3 -right-2 bg-green-500 text-white text-[9px] px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
                                SAVE 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-end">
                        
                        {/* 1. FREE TIER */}
                        <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 relative group hover:-translate-y-1 transition-transform h-min shadow-sm">
                            <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-4">Rookie</h3>
                            <div className="mb-6">
                                <span className="text-4xl font-black text-slate-700">Free</span>
                            </div>
                            <div className="space-y-3 mb-8">
                                <FeatureItem text="Basic Quest Access" included />
                                <FeatureItem text="Community Feed" included />
                                <FeatureItem text="1 Active Application" included />
                                <FeatureItem text="AI Sensei (Limited)" included={false} />
                                <FeatureItem text="Vision Board" included={false} />
                            </div>
                            <DuoButton variant="secondary" themeColor="slate" fullWidth className="py-4">
                                Current Plan
                            </DuoButton>
                        </div>

                        {/* 2. SINGLE DOJO (DYNAMIC BRANDING) */}
                        <div className={`bg-white rounded-[32px] border-2 border-b-[8px] p-6 relative group hover:-translate-y-1 transition-transform z-10 ${branding.dark}`}>
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${branding.bg} text-white px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm border-2 border-white`}>
                                Most Focused
                            </div>
                            
                            <h3 className={`text-xl font-black uppercase tracking-widest mb-4 ${branding.text}`}>
                                {domainLabel} Master
                            </h3>
                            <div className="mb-6 flex items-baseline">
                                <span className="text-5xl font-black text-slate-700">$6.4</span>
                                <span className="text-slate-400 font-bold ml-1">/mo</span>
                            </div>
                            <p className="text-xs font-bold text-slate-400 mb-6">
                                Unlock everything in the <span className={`capitalize ${branding.text}`}>{config.name}</span>.
                            </p>
                            
                            <div className="space-y-3 mb-8">
                                <FeatureItem text="Unlimited Quests" included color={branding.text} />
                                <FeatureItem text="Unlimited Applications" included color={branding.text} />
                                <FeatureItem text="Full AI Sensei Access" included color={branding.text} />
                                <FeatureItem text="Vision Board Unlocked" included color={branding.text} />
                                <FeatureItem text="Other Dojos Locked" included={false} />
                            </div>
                            
                            <button className={`w-full py-4 rounded-2xl font-black text-white uppercase tracking-widest border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all shadow-xl flex items-center justify-center gap-2 ${branding.bg} ${branding.dark}`}>
                                Upgrade Now
                            </button>
                        </div>

                        {/* 3. ALL ACCESS (GRANDMASTER) */}
                        <div className="bg-gradient-to-b from-[#2a0b55] to-[#581c87] rounded-[32px] border-4 border-[#7e22ce] border-b-[10px] p-6 relative group hover:-translate-y-2 transition-transform shadow-2xl scale-105 z-20">
                            <div className="absolute top-0 right-0 p-20 bg-white opacity-5 blur-3xl rounded-full pointer-events-none"></div>
                            
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-yellow-900 px-6 py-2 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg border-4 border-[#581c87] flex items-center gap-2 whitespace-nowrap">
                                <Crown className="w-4 h-4 fill-current" /> Best Value
                            </div>

                            <h3 className="text-xl font-black text-yellow-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Infinity className="w-6 h-6" /> Grandmaster
                            </h3>
                            
                            <div className="mb-6 flex items-baseline text-white">
                                <span className="text-6xl font-black">$9.2</span>
                                <span className="text-purple-300 font-bold ml-1">/mo</span>
                            </div>
                            
                            <p className="text-xs font-bold text-purple-200 mb-6">
                                Total domination. Unlock Student, Intern, and Scholar Dojos.
                            </p>

                            <div className="space-y-3 mb-8">
                                <FeatureItem text="Access ALL 3 Dojos" included color="text-yellow-400" icon={Globe} darkMode />
                                <FeatureItem text="Cross-Domain Strategy" included color="text-yellow-400" icon={Zap} darkMode />
                                <FeatureItem text="Priority AI Response" included color="text-yellow-400" icon={Star} darkMode />
                                <FeatureItem text="Exclusive 'Mythic' Badge" included color="text-yellow-400" icon={Crown} darkMode />
                                <FeatureItem text="No Ads" included color="text-yellow-400" darkMode />
                            </div>

                            <button className="w-full py-4 rounded-2xl font-black text-[#581c87] bg-yellow-400 hover:bg-yellow-300 border-b-[6px] border-yellow-600 active:border-b-0 active:translate-y-[6px] transition-all shadow-xl shadow-purple-900/50 uppercase tracking-widest flex items-center justify-center gap-2">
                                Get Super Access
                            </button>
                        </div>

                    </div>
                    
                    <div className="mt-8 text-center">
                        <button onClick={onClose} className="text-slate-400 font-bold uppercase text-xs tracking-widest hover:text-slate-600 transition-colors">
                            No thanks, I'll stay on the Rookie plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ text, included, color = 'text-green-500', icon: Icon = Check, darkMode = false }: { text: string, included: boolean, color?: string, icon?: any, darkMode?: boolean }) => {
    return (
        <div className="flex items-center gap-3">
            <div className={`
                w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2
                ${included 
                    ? (darkMode ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400' : `bg-slate-100 ${color.replace('text', 'border')} ${color}`) 
                    : (darkMode ? 'bg-purple-900 border-purple-700 text-purple-700' : 'bg-slate-100 border-slate-200 text-slate-300')
                }
            `}>
                {included ? <Icon className="w-3.5 h-3.5 stroke-[4px]" /> : <Lock className="w-3 h-3 stroke-[3px]" />}
            </div>
            <span className={`font-bold text-sm ${darkMode ? (included ? 'text-white' : 'text-purple-400') : (included ? 'text-slate-600' : 'text-slate-400')}`}>
                {text}
            </span>
        </div>
    );
};
