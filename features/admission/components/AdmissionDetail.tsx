
import React, { useState } from 'react';
import { AdmissionApp } from '../types';
import { AdmissionChecklist } from './AdmissionChecklist';
import { ChevronLeft, Trash2, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { DuoButton } from '../../../components/DuoButton';

interface AdmissionDetailProps {
    app: AdmissionApp;
    onBack: () => void;
    onDelete: () => void;
}

export const AdmissionDetail: React.FC<AdmissionDetailProps> = ({ app, onBack, onDelete }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    return (
        <div className="animate-in slide-in-from-right duration-500 pb-20">
            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)}></div>
                    <div className="relative bg-white rounded-[32px] border-4 border-slate-200 p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95">
                        <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-6 border-b-4 border-red-200">
                            <AlertTriangle size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Discard Target?</h3>
                        <p className="text-slate-500 font-bold text-sm mb-8">This will delete all progress and linked quests for this mission. This action is final.</p>
                        <div className="grid grid-cols-2 gap-3">
                            <DuoButton variant="secondary" themeColor="slate" onClick={() => setShowDeleteConfirm(false)}>Wait!</DuoButton>
                            <DuoButton themeColor="red" onClick={onDelete}>Delete</DuoButton>
                        </div>
                    </div>
                </div>
            )}

            {/* Nav */}
            <div className="flex items-center justify-between mb-6">
                <DuoButton 
                    variant="navigation" 
                    startIcon={ChevronLeft}
                    onClick={onBack}
                >
                    Back to Desk
                </DuoButton>
                <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="text-slate-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-xl active:scale-95"
                    title="Remove Application"
                >
                    <Trash2 size={24} strokeWidth={2.5} />
                </button>
            </div>

            {/* Header Card */}
            <div className="bg-white rounded-[40px] border-2 border-slate-200 border-b-[8px] p-8 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <img src={app.image} className="w-64 h-64 object-contain" alt="watermark" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-4 flex items-center justify-center">
                        <img src={app.image} className="w-full h-full object-contain" alt="logo" />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-black text-slate-800 mb-2 leading-tight tracking-tight">{app.name}</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border border-slate-200 flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> Deadline: {new Date(app.deadline).toLocaleDateString()}
                            </span>
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide border flex items-center gap-2 ${
                                app.progress === 100 
                                ? 'bg-green-100 text-green-700 border-green-200' 
                                : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }`}>
                                <Clock className="w-3 h-3" /> {app.progress === 100 ? 'Ready to Submit' : 'In Progress'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checklist Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 md:p-8">
                        <AdmissionChecklist 
                            targetId={app.id}
                            targetType={app.type}
                            variant="FULL"
                        />
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-[#1cb0f6] p-8 rounded-[40px] border-b-[12px] border-[#1899d6] text-white text-center relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
                        <h3 className="font-black text-2xl mb-3 relative z-10">Need Help?</h3>
                        <p className="text-sky-100 font-bold text-sm mb-8 leading-relaxed relative z-10">
                            Our AI Sensei can review your uploaded documents and give you a readability score.
                        </p>
                        <button className="w-full bg-white text-sky-500 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border-b-[6px] border-sky-200 active:border-b-0 active:translate-y-[6px] transition-all relative z-10 shadow-lg">
                            Analyze with Sensei
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
