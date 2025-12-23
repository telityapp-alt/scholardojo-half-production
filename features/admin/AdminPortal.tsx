
import React from 'react';
import { ForgeView } from '../forge/components/ForgeView';
import { Database, Plus, Settings, ShieldCheck } from 'lucide-react';

export const AdminPortal: React.FC = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* MINIMALIST SIDEBAR (NOTION STYLE) */}
            <div className="flex h-screen overflow-hidden">
                <aside className="w-64 border-r border-slate-200 bg-slate-50/50 flex flex-col shrink-0 hidden md:flex">
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center text-white shadow-sm">
                            <Database size={18} />
                        </div>
                        <span className="font-bold text-sm tracking-tight uppercase">Dojo Forge</span>
                    </div>
                    
                    <nav className="flex-1 px-3 space-y-1">
                        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Systems</p>
                        <button className="w-full flex items-center gap-3 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium shadow-sm">
                            <Database size={16} className="text-slate-500" />
                            Content Grid
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:bg-white hover:border-slate-200 rounded-md text-sm font-medium transition-all">
                            <ShieldCheck size={16} />
                            AI Protocols
                        </button>
                    </nav>

                    <div className="p-6 border-t border-slate-200">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Settings size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">v5.0-Neural</span>
                        </div>
                    </div>
                </aside>

                {/* MAIN AREA */}
                <main className="flex-1 overflow-y-auto bg-white p-8 md:p-12">
                    <div className="max-w-5xl mx-auto">
                        <ForgeView />
                    </div>
                </main>
            </div>
        </div>
    );
};
