
import React from 'react';
import { ExternalLink, FileText, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../core/hooks/useLanguage';

interface SourceSectionProps {
    sourceUrl?: string;
    documentUrl?: string;
    orgName: string;
    title: string;
}

export const SourceSection: React.FC<SourceSectionProps> = ({ sourceUrl, documentUrl, orgName, title }) => {
    const { t } = useLanguage();
    
    return (
        <div className="bg-slate-100 rounded-[32px] p-6 border-2 border-slate-200">
            <h4 className="font-bold text-slate-600 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                <ShieldCheck className="w-4 h-4" /> {t.common.officialSources}
            </h4>
            
            <div className="space-y-3">
                {sourceUrl && (
                    <a 
                        href={sourceUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-200 border-b-4 hover:border-b-[6px] active:border-b-2 active:translate-y-[2px] transition-all group cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                                 <ExternalLink className="w-5 h-5 stroke-[2.5]" />
                             </div>
                             <div>
                                 <p className="font-bold text-slate-700 text-sm">Official Website</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{t.common.visit} {orgName}</p>
                             </div>
                        </div>
                    </a>
                )}

                {documentUrl && (
                    <a 
                        href={documentUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-slate-200 border-b-4 hover:border-b-[6px] active:border-b-2 active:translate-y-[2px] transition-all group cursor-pointer"
                    >
                         <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                 <FileText className="w-5 h-5 stroke-[2.5]" />
                             </div>
                             <div>
                                 <p className="font-bold text-slate-700 text-sm">Guidebook PDF</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Download {title}</p>
                             </div>
                        </div>
                    </a>
                )}
                
                {!sourceUrl && !documentUrl && (
                    <div className="text-center p-4 text-slate-400 text-sm font-bold">
                        No external sources linked.
                    </div>
                )}
            </div>
        </div>
    );
};
