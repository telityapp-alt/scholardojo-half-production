import React from 'react';
import { AdmissionRequirement } from '../types';
import { CheckCircle2, BadgeCheck, Clock, Upload, FileText, Scale } from 'lucide-react';

interface RequirementItemProps {
    item: AdmissionRequirement;
    isLast: boolean;
    onToggle: () => void;
    onUpload: () => void;
}

export const RequirementItem: React.FC<RequirementItemProps> = ({ item, isLast, onToggle, onUpload }) => {
    
    const renderStatusBadge = (status: string) => {
        switch (status) {
            case 'VERIFIED':
                return <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-green-100 text-green-600 px-2 py-1 rounded-lg border border-green-200"><BadgeCheck className="w-3 h-3" /> Verified</span>;
            case 'UPLOADED':
                return <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-sky-100 text-sky-600 px-2 py-1 rounded-lg border border-sky-200"><CheckCircle2 className="w-3 h-3" /> Uploaded</span>;
            case 'MISSING':
                return <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-red-100 text-red-600 px-2 py-1 rounded-lg border border-red-200"><Clock className="w-3 h-3" /> Missing</span>;
            default:
                return <span className="flex items-center gap-1 text-[10px] font-black uppercase bg-slate-200 text-slate-500 px-2 py-1 rounded-lg border border-slate-300"><Clock className="w-3 h-3" /> Pending</span>;
        }
    };

    return (
        <div 
            className={`p-4 flex flex-col md:flex-row items-start md:items-center justify-between group hover:bg-white transition-colors border-slate-200 gap-4 ${!isLast ? 'border-b-2' : ''}`}
        >
            <div className="flex items-center gap-4">
                <button 
                    onClick={onToggle}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${
                        item.status === 'VERIFIED' ? 'bg-green-500 border-green-500' : 
                        item.status === 'UPLOADED' ? 'bg-sky-500 border-sky-500' :
                        'border-slate-300 bg-white hover:border-sky-400'
                    }`}
                >
                    {(item.status === 'VERIFIED' || item.status === 'UPLOADED') && <CheckCircle2 className="w-4 h-4 text-white stroke-[3px]" />}
                </button>
                <div>
                    <p className={`font-bold text-sm ${item.status === 'VERIFIED' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        {item.label}
                    </p>
                    {item.type && (
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5 block">{item.type}</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4 ml-10 md:ml-0">
                {renderStatusBadge(item.status)}
                
                {/* Action Button Logic */}
                {item.status !== 'VERIFIED' && (
                    <button 
                        onClick={onUpload}
                        className="p-2 rounded-xl text-slate-300 hover:text-sky-500 hover:bg-sky-50 transition-colors border-2 border-transparent hover:border-sky-100"
                        title="Action"
                    >
                        {item.type === 'DOC' ? <Upload className="w-5 h-5 stroke-[2.5px]" /> :
                         item.type === 'ESSAY' ? <FileText className="w-5 h-5 stroke-[2.5px]" /> :
                         <Scale className="w-5 h-5 stroke-[2.5px]" />}
                    </button>
                )}
            </div>
        </div>
    );
};