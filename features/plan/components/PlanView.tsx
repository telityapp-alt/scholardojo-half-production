import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DomainType } from '../../../core/contracts/entityMap';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { usePlanLogic } from '../hooks/usePlanLogic';
import { CalendarItem } from '../types';

// Components
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { CalendarSidebar } from './CalendarSidebar';

// Modals
import { EventDetailModal } from '../../events/components/EventDetailModal';
import { QuestModal } from '../../quest/components/QuestModal';
import { GenericEvent } from '../../../core/contracts/entityMap';
import { QuestCard } from '../../quest/types';

export const PlanView: React.FC = () => {
  const { domain } = useParams<{ domain: string }>();
  const navigate = useNavigate();
  
  const domainEnum = Object.values(DomainType).find(d => d === domain) as DomainType || DomainType.STUDENT;
  const config = DOMAIN_CONFIGS[domainEnum];

  // Logic Hook
  const { items } = usePlanLogic(config);

  // View State
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Interaction State
  const [selectedItem, setSelectedItem] = useState<CalendarItem | null>(null);

  // Handlers
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const handleDaySelect = (date: Date) => setSelectedDate(date);

  const handleItemClick = (item: CalendarItem) => {
      // 1. If it's a Program or Deadline (Vault), we navigate to the existing full page detail
      if (item.type === 'PROGRAM') {
          const program = item.metadata.originalData as any;
          navigate(`/${domain}/discovery/programs/${program.id}`);
          return;
      }
      if (item.type === 'DEADLINE') {
          const vault = item.metadata.originalData as any;
          navigate(`/${domain}/discovery/vault/${vault.id}`);
          return;
      }

      // 2. If it's an Event or Quest, we show the modal here
      setSelectedItem(item);
  };

  // Filter Items for Sidebar
  const selectedDayItems = items.filter(item => 
      item.date.getDate() === selectedDate.getDate() &&
      item.date.getMonth() === selectedDate.getMonth() &&
      item.date.getFullYear() === selectedDate.getFullYear()
  );

  return (
    <div className="flex flex-col xl:flex-row gap-8 pb-24">
      
      {/* LEFT: Calendar Grid Area */}
      <div className="flex-1 flex flex-col">
          <CalendarHeader 
              currentDate={currentDate} 
              onPrev={prevMonth} 
              onNext={nextMonth} 
              themeColor={config.theme}
          />
          <CalendarGrid 
              currentDate={currentDate} 
              selectedDate={selectedDate} 
              items={items} 
              onSelectDate={handleDaySelect} 
              themeColor={config.theme}
          />
      </div>

      {/* RIGHT: Sidebar Detail Area */}
      <CalendarSidebar 
          selectedDate={selectedDate} 
          items={selectedDayItems} 
          onItemClick={handleItemClick} 
      />

      {/* --- MODALS --- */}
      
      {/* Event Modal */}
      {selectedItem?.type === 'EVENT' && (
          <EventDetailModal 
              event={selectedItem.metadata.originalData as GenericEvent} 
              onClose={() => setSelectedItem(null)} 
          />
      )}

      {/* Quest Modal */}
      {selectedItem?.type === 'QUEST' && (
          <QuestModal 
              isOpen={true}
              onClose={() => setSelectedItem(null)}
              quest={null} // Pass null to create new or pass mock if available
              onSave={() => setSelectedItem(null)}
          />
      )}

    </div>
  );
};