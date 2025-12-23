import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { DomainType } from '../../../core/contracts/entityMap';
import { useEventDetail } from '../hooks/useEventLogic';
import { ChevronLeft, Calendar, Clock, MapPin, Users, Share2, ExternalLink, Building2, Video, Mic2, Layout } from 'lucide-react';
import { SourceSection } from '../../../components/shared/SourceSection';
import { DuoButton } from '../../../components/DuoButton';

export const EventDetail: React.FC = () => {
    const { domain, detailId } = useParams<{ domain: string; detailId: string }>();
    const navigate = useNavigate();

    const domainEnum = Object.values(DomainType).find(d => d === domain) as DomainType;
    const config = domainEnum ? DOMAIN_CONFIGS[domainEnum] : DOMAIN_CONFIGS[DomainType.STUDENT];

    const { event, loading } = useEventDetail(detailId, config);

    // Theme Logic based on Domain (Consistent with Cards)
    const getTheme = () => {
        switch (domain) {
            case 'intern': return { 
                bg: 'bg-duo-orange', border: 'border-duo-orangeDark', text: 'text-duo-orange', 
                lightBg: 'bg-orange-100', lightBorder: 'border-orange-200' 
            };
            case 'scholar': return { 
                bg: 'bg-duo-blue', border: 'border-duo-blueDark', text: 'text-duo-blue', 
                lightBg: 'bg-duo-blueLight', lightBorder: 'border-blue-200' 
            };
            default: return { 
                bg: 'bg-duo-green', border: 'border-duo-greenDark', text: 'text-duo-green', 
                lightBg: 'bg-duo-greenLight', lightBorder: 'border-green-200' 
            };
        }
    };
    const theme = getTheme();

    if (loading) return <div className="p-10 text-center font-bold text-slate-300">Loading Event...</div>;
    if (!event) return <div className="p-10 text-center font-bold text-slate-300">Event Not Found</div>;

    const LocationIcon = event.locationType === 'Virtual' ? Video : MapPin;
    const CategoryIcon = event.category === 'Workshop' ? Layout : event.category === 'Webinar' ? Mic2 : Users;

    return (
        <div className="animate-in slide-in-from-right duration-500 pb-20 max-w-6xl mx-auto">
            
            {/* Navigation Button */}
            <div className="mb-6">
                <DuoButton 
                    variant="navigation" 
                    startIcon={ChevronLeft}
                    onClick={() => navigate(`/${domain}/discovery/events`)}
                >
                    {config.eventConfig.labelPlural}
                </DuoButton>
            </div>

            {/* HERO SECTION */}
            <div className="relative h-80 rounded-[40px] border-b-[8px] border-slate-200 overflow-hidden mb-8 shadow-xl bg-slate-800 group">
                <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                
                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                     <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border-b-4 mb-4 bg-white ${theme.text} ${theme.border} border-white/20`}>
                        <CategoryIcon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">{event.category}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight shadow-sm max-w-3xl">
                        {event.title}
                    </h1>
                    <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                        <Building2 className="w-4 h-4" /> Hosted by {event.organizer}
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* LEFT COLUMN: Content */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Description Card */}
                    <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[6px] p-8">
                        <h3 className="font-bold text-slate-700 text-xl mb-4">About this Event</h3>
                        <p className="text-slate-500 font-medium leading-relaxed whitespace-pre-line">
                            {event.fullDescription || event.description}
                        </p>

                        {/* Tags */}
                        <div className="mt-6 flex flex-wrap gap-2">
                            {event.tags.map((tag, i) => (
                                <span key={i} className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-xl text-xs font-bold border-b-2 border-slate-200">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Organizer Card */}
                    <div className="bg-white rounded-[32px] border-2 border-slate-200 border-b-[6px] p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                                 <Building2 className="w-8 h-8 text-slate-400" />
                             </div>
                             <div>
                                 <div className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Organizer</div>
                                 <div className="text-lg font-bold text-slate-700">{event.organizer}</div>
                             </div>
                        </div>
                        <div>
                             <DuoButton variant="secondary" themeColor={config.theme} className="text-xs">
                                 View Profile
                             </DuoButton>
                        </div>
                    </div>

                    {/* Source / Official Link */}
                    <SourceSection 
                        sourceUrl={event.link}
                        orgName={event.organizer}
                        title={event.title}
                    />
                </div>

                {/* RIGHT COLUMN: Sticky Sidebar */}
                <div className="space-y-6">
                    
                    {/* Action Card */}
                    <div className={`bg-white rounded-[32px] border-2 border-slate-200 border-b-[8px] p-6 sticky top-6 z-10`}>
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <div className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Price</div>
                                <div className={`text-3xl font-bold ${event.price === 0 ? 'text-green-500' : 'text-slate-700'}`}>
                                    {event.price === 0 ? 'Free' : `$${event.price}`}
                                </div>
                            </div>
                            <div className="text-right">
                                 <div className="text-xs font-bold uppercase text-slate-400 tracking-widest mb-1">Spots</div>
                                 <div className="text-sm font-bold text-slate-600 flex items-center gap-1 justify-end">
                                    <Users className="w-4 h-4" /> {event.attendees} Registered
                                 </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <DuoButton 
                                variant="primary" 
                                themeColor={config.theme} 
                                endIcon={ExternalLink} 
                                onClick={() => window.open(event.link, '_blank')}
                                fullWidth
                                className="text-lg py-4"
                            >
                                Register Now
                            </DuoButton>

                            <DuoButton 
                                variant="secondary" 
                                themeColor="slate" 
                                startIcon={Share2}
                                fullWidth
                            >
                                Share Event
                            </DuoButton>
                        </div>
                    </div>

                    {/* Logistics Card */}
                    <div className="bg-slate-50 rounded-[32px] border-2 border-slate-200 p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl border-b-4 border-slate-200 flex items-center justify-center text-orange-500">
                                <Calendar className="w-6 h-6 stroke-[2.5]" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Date</div>
                                <div className="font-bold text-slate-700">
                                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl border-b-4 border-slate-200 flex items-center justify-center text-sky-500">
                                <Clock className="w-6 h-6 stroke-[2.5]" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Time</div>
                                <div className="font-bold text-slate-700">{event.time} ({event.durationMinutes} mins)</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl border-b-4 border-slate-200 flex items-center justify-center text-purple-500">
                                <LocationIcon className="w-6 h-6 stroke-[2.5]" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase text-slate-400">Location</div>
                                <div className="font-bold text-slate-700">{event.locationType}</div>
                                <div className="text-xs font-bold text-slate-400 truncate w-40">{event.locationAddress}</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};