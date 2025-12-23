
import React from 'react';
import { Globe, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegionLockedProps {
  featureName: string;
}

export const RegionLocked: React.FC<RegionLockedProps> = ({ featureName }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 animate-in fade-in zoom-in duration-500 text-center">
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-slate-100 rounded-[40px] border-b-[10px] border-slate-200 flex items-center justify-center text-slate-300 shadow-inner">
          <Globe size={64} className="opacity-20" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-red-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg animate-bounce-slow">
          <Lock size={20} strokeWidth={3} />
        </div>
      </div>
      
      <h1 className="font-display font-black text-3xl text-slate-800 uppercase tracking-tighter mb-3">
        Akses Terbatas
      </h1>
      
      <p className="text-slate-400 font-bold max-w-sm mb-10 leading-relaxed">
        Modul <span className="text-slate-600">"{featureName}"</span> saat ini hanya tersedia untuk anggota Dojo di wilayah <span className="text-sky-500">Indonesia (ID)</span>.
      </p>

      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-3 bg-white border-2 border-slate-200 border-b-[6px] px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 active:border-b-2 active:translate-y-[4px] transition-all shadow-sm"
      >
        <ArrowLeft size={16} strokeWidth={4} /> Kembali
      </button>
    </div>
  );
};
