import React from 'react';
import { GenericHost } from '../../../../core/contracts/entityMap';

interface HostGalleryProps {
    host: GenericHost;
}

export const HostGallery: React.FC<HostGalleryProps> = ({ host }) => {
    if (!host.gallery || host.gallery.length === 0) {
        return <div className="p-8 text-center text-slate-400 font-bold">No gallery images available.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
            {host.gallery.map((item, i) => (
                <div key={i} className={`group bg-white p-3 rounded-3xl border-2 border-slate-200 border-b-[6px] cursor-pointer hover:-translate-y-1 hover:border-b-[8px] transition-all ${i === 0 ? 'md:col-span-2' : ''}`}>
                    <div className={`rounded-2xl overflow-hidden mb-4 border-2 border-slate-100 ${i === 0 ? 'h-64' : 'h-40'}`}>
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="px-2 pb-2">
                        <span className="inline-block bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2 border-2 border-slate-200">
                            {item.tag}
                        </span>
                        <h4 className="text-xl font-black text-slate-700">{item.title}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};