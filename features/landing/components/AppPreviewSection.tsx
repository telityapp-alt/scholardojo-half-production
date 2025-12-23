
import React, { useState } from 'react';
import { Globe, Building2, Library, Calendar, Lock } from 'lucide-react';
import { MOCK_PROGRAMS, MOCK_HOSTS, MOCK_VAULT_ITEMS, MOCK_EVENTS } from '../../../core/access/mockData';
import { ProgramCard } from '../../../components/ProgramCard';
import { HostCard } from '../../host/components/HostCard';
import { VaultCard } from '../../vault/components/VaultCard';
import { EventCard } from '../../events/components/EventCard';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { DomainType } from '../../../core/contracts/entityMap';

interface AppPreviewSectionProps {
    onTriggerAuth: () => void;
}

type TabType = 'PROGRAMS' | 'CAMPUS' | 'VAULT' | 'EVENTS';

export const AppPreviewSection: React.FC<AppPreviewSectionProps> = ({ onTriggerAuth }) => {
    const [activeTab, setActiveTab] = useState<TabType>('PROGRAMS');
    const studentConfig = DOMAIN_CONFIGS[DomainType.STUDENT];

    const tabs = [
        { id: 'PROGRAMS', label: 'Global Programs', icon: Globe, color: 'text-pink-500', bg: 'bg-pink-100', border: 'border-pink-200' },
        { id: 'CAMPUS', label: 'Campus Dex', icon: Building2, color: 'text-indigo-500', bg: 'bg-indigo-100', border: 'border-indigo-200' },
        { id: 'VAULT', label: 'Scholar Vault', icon: Library, color: 'text-sky-500', bg: 'bg-sky-100', border: 'border-sky-200' },
        { id: 'EVENTS', label: 'Events', icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-100', border: 'border-orange-200' },
    ];

    return (
        <section className="py-24 px-6 bg-slate-50 border-y-2 border-slate-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-5"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-slate-200 shadow-sm mb-6 animate-bounce-slow">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="font-black text-slate-500 text-xs uppercase tracking-widest">Live Database Preview</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
                        See what's <span className="text-[#1cb0f6]">inside.</span>
                    </h2>
                    <p className="text-xl font-bold text-slate-400 max-w-2xl mx-auto">
                        Explore real opportunities currently available on the platform. 
                        No fake screenshots. This is the actual engine.
                    </p>
                </div>

                <div className="bg-white rounded-[40px] border-4 border-slate-200 shadow-2xl overflow-hidden">
                    
                    <div className="bg-slate-100 border-b-2 border-slate-200 p-4 flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500"></div>
                        </div>
                        <div className="flex-1 bg-white h-10 rounded-xl border-2 border-slate-200 flex items-center px-4 gap-2 text-slate-400 font-bold text-xs mx-4">
                            <Lock className="w-3 h-3" /> scholar.dojo/app/discover
                        </div>
                    </div>

                    <div className="p-2 bg-white border-b-2 border-slate-100 flex overflow-x-auto scrollbar-hide gap-2">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as TabType)}
                                    className={`
                                        flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wide transition-all border-2 border-b-[4px] min-w-max
                                        ${isActive 
                                            ? `${tab.bg} ${tab.color} ${tab.border} active:translate-y-[2px] active:border-b-2` 
                                            : 'bg-white text-slate-400 border-white hover:bg-slate-50'
                                        }
                                    `}
                                >
                                    <Icon className="w-4 h-4 stroke-[3px]" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-8 bg-[#f8fafc] min-h-[600px]">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            
                            {activeTab === 'PROGRAMS' && MOCK_PROGRAMS.slice(0, 3).map(program => (
                                <div key={program.id} className="relative group" onClick={onTriggerAuth}>
                                    <ProgramCard program={program} config={studentConfig} />
                                    <div className="absolute inset-0 bg-white/0 group-hover:bg-slate-900/5 transition-colors rounded-[32px] pointer-events-none" />
                                </div>
                            ))}

                            {activeTab === 'CAMPUS' && MOCK_HOSTS.slice(0, 3).map(host => (
                                <div key={host.id} className="relative group" onClick={onTriggerAuth}>
                                    <HostCard host={host} domain={DomainType.STUDENT} />
                                </div>
                            ))}

                            {activeTab === 'VAULT' && MOCK_VAULT_ITEMS.slice(0, 6).map(item => (
                                <div key={item.id} className="relative group" onClick={onTriggerAuth}>
                                    <VaultCard item={item} domain={DomainType.STUDENT} />
                                </div>
                            ))}

                            {activeTab === 'EVENTS' && MOCK_EVENTS.slice(0, 3).map(event => (
                                <div key={event.id} className="relative group" onClick={onTriggerAuth}>
                                    <EventCard event={event} />
                                </div>
                            ))}

                        </div>

                        <div className="mt-12 flex justify-center">
                            <button 
                                onClick={onTriggerAuth}
                                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-sm border-b-[6px] border-slate-950 active:border-b-0 active:translate-y-[6px] transition-all hover:bg-slate-800 shadow-xl"
                            >
                                Unlock Full Database
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
