
import React from 'react';
import { ChevronRight, Clock, Users } from 'lucide-react';
import { GenericEvent, DomainType } from '../../../core/contracts/entityMap';
import { generateEventTags } from '../../../core/engines/eventTagEngine';
import { SuperTagBadge } from '../../../components/SuperTagBadge';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeEngine } from '../../../core/engines/themeEngine';

interface EventCardProps {
    event: GenericEvent;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const navigate = useNavigate();
    const { domain } = useParams<{ domain: string }>();
    const domainEnum = (domain as DomainType) || event.domain;

    // Auto Generate Tags
    const autoTags = generateEventTags(event);
    
    // Get centralized branding 
    const branding = ThemeEngine.getBranding(domainEnum);
    
    // Extract Month/Day
    const dateObj = new Date(event.date);
    const month = dateObj.toLocaleString('default', { month: 'short' });
    const day = dateObj.getDate();

    const handleClick = () => {
        // Navigate to /domain/discovery/events/:id
        navigate(`/${domain || event.domain}/discovery/events/${event.id}`);
    };

    return (
        <div 
            onClick={handleClick}
            className="group bg-white rounded-2xl border-2 border-slate-200 border-b-[6px] cursor-pointer hover:-translate-y-1 hover:border-b-[8px] active:border-b-2 active:translate-y-[4px] transition-all overflow-hidden flex flex-col h-full hover:shadow-xl"
        >
            {/* Image Header */}
            <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white rounded-xl p-2 text-center min-w-[60px] border-2 border-slate-200 border-b-4 shadow-md z-10">
                    <span className="block text-xs font-bold text-slate-400 capitalize">{month}</span>
                    <span className="block text-xl font-bold text-slate-700 leading-none">{day}</span>
                </div>

                {/* Urgency Tag (Top Right) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end z-10">
                   {autoTags.filter(t => t.variant === 'urgency').map(tag => (
                       <SuperTagBadge key={tag.id} tag={tag} />
                   ))}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col relative">
                {/* Category Pill */}
                <div className="mb-2">
                    <span className={`text-[10px] font-bold capitalize ${branding.text}`}>
                        {event.category}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-700 leading-tight mb-3 group-hover:text-slate-600 transition-colors line-clamp-2">
                    {event.title}
                </h3>
                
                {/* Tags Row */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {autoTags.filter(t => t.variant !== 'urgency').slice(0, 3).map((tag, i) => (
                        <SuperTagBadge key={i} tag={tag} />
                    ))}
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t-2 border-slate-50">
                    <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span>{event.attendees} going</span>
                        </div>
                    </div>
                    {/* Button with Arrow using centralized primary color */}
                    <button className={`w-10 h-10 rounded-xl flex items-center justify-center text-white border-b-4 active:border-b-0 active:translate-y-[4px] transition-all group-hover:brightness-105 ${branding.primary} ${branding.dark}`}>
                        <ChevronRight className="w-6 h-6 stroke-[3px]" />
                    </button>
                </div>
            </div>
        </div>
    );
};
