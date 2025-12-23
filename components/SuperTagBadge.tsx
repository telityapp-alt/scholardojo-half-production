import React from 'react';
import { SuperTag } from '../core/contracts/entityMap';
import { Crown, Star, Circle, Flame, DollarSign, Wifi, Award, Ticket, Map } from 'lucide-react';

interface SuperTagBadgeProps {
  tag: SuperTag;
}

export const SuperTagBadge: React.FC<SuperTagBadgeProps> = ({ tag }) => {
  
  // Dynamic Icon Mapping
  const getIcon = () => {
    switch (tag.iconName) {
      case 'crown': return Crown;
      case 'star': return Star;
      case 'flame': return Flame;
      case 'dollar': return DollarSign;
      case 'wifi': return Wifi;
      case 'award': return Award;
      case 'ticket': return Ticket;
      case 'map': return Map;
      default: return Circle;
    }
  };

  const Icon = getIcon();

  // "Juicy" Style: No uppercase, softer colors, rounded-lg
  return (
    <span 
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl 
        text-xs font-bold capitalize border-b-2 transition-transform hover:-translate-y-0.5
        ${tag.color}
        ${tag.animated ? 'animate-pulse' : ''}
      `}
    >
      <Icon size={14} strokeWidth={2.5} />
      {tag.label}
    </span>
  );
};