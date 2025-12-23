
import React, { useState } from 'react';
import { CheckCircle2, Calendar, MapPin, Building2, Tag, ArrowRight, AlertCircle, Type, Layout } from 'lucide-react';
import { DuoButton } from '../../../components/DuoButton';
import { DuoIcon } from '../../../components/ui/DuoIcon';

interface VerifyExtractionProps {
    data: any;
    onConfirm: (finalData: any) => void;
    onCancel: () => void;
}

export const VerifyExtraction: React.FC<VerifyExtractionProps> = ({ data, onConfirm, onCancel }) => {
    const [editedData, setEditedData] = useState(data);

    const updateField = (field: string, val: any) => {
        setEditedData({ ...editedData, [field]: val });
    };

    return (
        <div className="fixed inset-0 z-[301] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
            
            <div className="relative w-full max-w-3xl bg-white rounded-[40px] border-4 border-slate-200 border-b-[12px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 duration-500">
                
                {/* Header */}
                <div className="p-6 bg-duo-greenLight border-b-2 border-green-100 flex justify-between items-center shrink-0">
                    <div className="flex items-center gap-3 text-duo-greenDark">
                        <CheckCircle2 size={28} strokeWidth={3} />
                        <h2 className="text-2xl font-black">Scan Complete!</h2>
                    </div>
                </div>

                <div className="p-8 overflow-y-auto space-y-8 bg-slate-50 scrollbar-thin">
                    <div className="bg-yellow-50 border-2 border-yellow-100 rounded-2xl p-4 flex gap-4 items-start">
                        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm border-b-4 border-yellow-600">
                             <AlertCircle size={20} strokeWidth={3} />
                        </div>
                        <p className="text-yellow-800 text-xs font-bold leading-relaxed pt-1">
                            Sensei might get some details fuzzy. Please check the **Title**, **Organizer**, and **Category** before saving.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block ml-1">Event Title</label>
                            <input 
                                value={editedData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                                className="w-full p-5 bg-white border-2 border-slate-200 border-b-4 rounded-2xl font-black text-2xl text-slate-700 outline-none focus:border-sky-400 shadow-sm transition-all"
                            />
                        </div>

                        {/* Organizer & Category */}
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block ml-1">Host Organizer</label>
                             <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    value={editedData.organizer}
                                    onChange={(e) => updateField('organizer', e.target.value)}
                                    className="w-full p-4 pl-12 bg-white border-2 border-slate-200 border-b-4 rounded-2xl font-bold text-slate-700 outline-none focus:border-sky-400"
                                />
                             </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block ml-1">Category</label>
                             <div className="relative">
                                <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    value={editedData.category}
                                    onChange={(e) => updateField('category', e.target.value)}
                                    className="w-full p-4 pl-12 bg-white border-2 border-slate-200 border-b-4 rounded-2xl font-bold text-slate-700 outline-none focus:border-sky-400"
                                />
                             </div>
                        </div>

                        {/* Date & Location */}
                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block ml-1">Event Date</label>
                             <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    type="date"
                                    value={editedData.date?.split('T')[0]}
                                    onChange={(e) => updateField('date', e.target.value)}
                                    className="w-full p-4 pl-12 bg-white border-2 border-slate-200 border-b-4 rounded-2xl font-bold text-slate-700 outline-none focus:border-sky-400"
                                />
                             </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block ml-1">Location / Format</label>
                             <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    value={editedData.locationAddress || editedData.locationType}
                                    onChange={(e) => updateField('locationAddress', e.target.value)}
                                    className="w-full p-4 pl-12 bg-white border-2 border-slate-200 border-b-4 rounded-2xl font-bold text-slate-700 outline-none focus:border-sky-400"
                                />
                             </div>
                        </div>

                        {/* AI Summary */}
                        <div className="md:col-span-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block ml-1">Sensei's Summary</label>
                             <textarea 
                                value={editedData.description}
                                onChange={(e) => updateField('description', e.target.value)}
                                className="w-full h-24 p-5 bg-white border-2 border-slate-200 border-b-4 rounded-2xl font-bold text-slate-600 outline-none focus:border-sky-400 resize-none leading-relaxed"
                             />
                        </div>

                        {/* Tags Preview */}
                        <div className="md:col-span-2">
                             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block ml-1">Mapped Tags</label>
                             <div className="flex flex-wrap gap-3">
                                {editedData.aiSuggestedTags?.map((t: string, i: number) => (
                                    <span key={i} className="px-5 py-2.5 bg-white rounded-2xl border-2 border-slate-200 border-b-4 text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                        <Tag size={12} strokeWidth={3} />
                                        {t}
                                    </span>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-white border-t-2 border-slate-100 flex gap-4 shrink-0">
                    <DuoButton variant="secondary" themeColor="slate" onClick={onCancel} className="px-10">
                        Discard
                    </DuoButton>
                    <DuoButton 
                        themeColor="green" 
                        fullWidth 
                        endIcon={ArrowRight} 
                        onClick={() => onConfirm(editedData)}
                        className="py-5 text-lg"
                    >
                        Publish to Ecosystem
                    </DuoButton>
                </div>
            </div>
        </div>
    );
};
