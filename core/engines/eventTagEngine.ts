import { GenericEvent, SuperTag } from '../contracts/entityMap';

export function generateEventTags(event: GenericEvent): SuperTag[] {
  const tags: SuperTag[] = [];

  // 1. PRICE TAG
  if (event.price === 0) {
      tags.push({
          id: 'price-free',
          label: 'Free',
          variant: 'perk',
          color: 'bg-green-100 text-green-600 border-green-200',
          iconName: 'ticket'
      });
  } else {
       tags.push({
          id: 'price-paid',
          label: `$${event.price}`,
          variant: 'perk',
          color: 'bg-slate-100 text-slate-600 border-slate-200',
          iconName: 'dollar'
      });
  }

  // 2. FORMAT TAG
  const formatColor = event.locationType === 'Virtual' ? 'bg-indigo-100 text-indigo-600 border-indigo-200' : 'bg-orange-100 text-orange-600 border-orange-200';
  const formatIcon = event.locationType === 'Virtual' ? 'wifi' : 'map';
  
  tags.push({
      id: 'format',
      label: event.locationType,
      variant: 'type',
      color: formatColor,
      iconName: formatIcon
  });

  // 3. URGENCY
  const daysLeft = Math.ceil((new Date(event.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (daysLeft >= 0 && daysLeft <= 3) {
      tags.push({
          id: 'urgent',
          label: daysLeft === 0 ? 'Today' : 'Upcoming',
          variant: 'urgency',
          color: 'bg-red-100 text-red-600 border-red-200',
          iconName: 'flame',
          animated: true
      });
  }

  return tags;
}