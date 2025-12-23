import React from 'react';
import { X, Calendar, Clock, Target, Users, ExternalLink, MapPin, Share2, Globe, Building2 } from 'lucide-react';
import { GenericEvent } from '../../../core/contracts/entityMap';

interface EventDetailModalProps {
    event: GenericEvent;
    onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
    
    const handleOpenLink = () => {
        if (event.link) {
            window.open(event.link, '_blank');
        }
    };

    // Theme logic based on domain
    const getTheme = () => {
        switch(event.domain) {
            case 'intern': return { text: 'text-duo-orange', bg: 'bg-duo-orange', border: 'border-duo-orangeDark', lightBg: 'bg-orange-100' };
            case 'scholar': return { text: 'text-duo-blue', bg: 'bg-duo-blue', border: 'border-duo-blueDark', lightBg: 'bg-duo-blueLight' };
            default: return { text: 'text-duo-green', bg: 'bg-duo-green', border: 'border-duo-greenDark', lightBg: 'bg-duo-greenLight' };
        }
    };
    const theme = getTheme();

    return (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-6 animate-in fade-in duration-200">
            {/* Backdrop: Slate-900 instead of Black */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="relative w-full max-w-2xl bg-white rounded-t-[32px] md:rounded-[32px] border-2 border-slate-200 border-b-0 md:border-b-[8px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">
                
                {/* Modal Image Header */}
                <div className="h-64 w-full relative shrink-0">
                    <img src={event.image} className="w-full h-full object-cover" alt="Event" />
                    {/* Gradient overlay using Slate-900 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/40 transition-colors border-2 border-white/30"
                    >
                        <X className="w-6 h-6 text-white stroke-[3]" />
                    </button>

                    <div className="absolute bottom-6 left-6 right-6">
                        <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest mb-2 bg-white ${theme.text}`}>
                            {event.category}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight shadow-sm">
                            {event.title}
                        </h2>
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 bg-slate-50">
                    
                    {/* Key Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 border-b-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center border-b-4 border-orange-200">
                                <Calendar className="w-5 h-5 stroke-[3]" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Date</div>
                                <div className="font-bold text-slate-700 text-sm">
                                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 border-b-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-500 flex items-center justify-center border-b-4 border-sky-200">
                                <Clock className="w-5 h-5 stroke-[3]" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Time</div>
                                <div className="font-bold text-slate-700 text-sm">{event.time}</div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 border-b-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-500 flex items-center justify-center border-b-4 border-purple-200">
                                <MapPin className="w-5 h-5 stroke-[3]" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Location</div>
                                <div className="font-bold text-slate-700 text-sm truncate">{event.locationType}</div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 border-b-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-500 flex items-center justify-center border-b-4 border-green-200">
                                <Users className="w-5 h-5 stroke-[3]" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Attendees</div>
                                <div className="font-bold text-slate-700 text-sm">{event.attendees} Joining</div>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <Target className="w-5 h-5 text-slate-400" /> About Event
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            {event.fullDescription || event.description}
                        </p>
                    </div>

                    {/* Organizer */}
                    <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-slate-400" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Organizer</div>
                                <div className="font-bold text-slate-700">{event.organizer}</div>
                            </div>
                        </div>
                        <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
                            View Profile
                        </button>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="p-4 md:p-6 bg-white border-t-2 border-slate-100 flex gap-4 shrink-0 z-20">
                    <button className="p-4 rounded-2xl border-2 border-slate-200 border-b-4 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all active:border-b-2 active:translate-y-[2px]">
                        <Share2 className="w-6 h-6 stroke-[2.5]" />
                    </button>
                    <button 
                        onClick={handleOpenLink}
                        className={`flex-1 rounded-2xl font-bold text-white text-lg border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all shadow-xl flex items-center justify-center gap-2 ${theme.bg} ${theme.border} hover:brightness-110`}
                    >
                        Register Now <ExternalLink className="w-5 h-5 stroke-[3]" />
                    </button>
                </div>

            </div>
        </div>
    );
};