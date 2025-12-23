
import React from 'react';
import { Library } from 'lucide-react';
import { DuoSearch } from '../../../components/ui/DuoSearch';
import { useLanguage } from '../../../core/hooks/useLanguage';

interface VaultHeaderProps {
    search: string;
    setSearch: (val: string) => void;
    title: string;
    subtitle: string;
}

export const VaultHeader: React.FC<VaultHeaderProps> = ({ search, setSearch }) => {
    const { t } = useLanguage();
    
    return (
        <div className="mb-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-700 flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-500 rounded-xl border-b-[5px] border-indigo-700 flex items-center justify-center text-white shadow-lg">
                            <Library className="w-7 h-7 stroke-[3px]" />
                        </div>
                        {t.vault.title}
                    </h1>
                    <p className="text-slate-400 font-bold text-lg mt-2 ml-16">
                        {t.vault.subtitle}
                    </p>
                </div>

                <div className="w-full md:w-96">
                    <DuoSearch 
                        value={search} 
                        onChange={setSearch} 
                        placeholder={t.vault.searchPlaceholder}
                    />
                </div>
            </div>
        </div>
    );
};
