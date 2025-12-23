
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DomainType, GenericEvent } from '../../../core/contracts/entityMap';
import { DOMAIN_CONFIGS } from '../../../core/contracts/domainConfig';
import { useEventLogic } from '../hooks/useEventLogic';
import { EventCard } from './EventCard';
import { CreateEventModal } from './CreateEventModal';
import { EventFilter } from './EventFilter';
import { DuoCard } from '../../../components/DuoCard';
import { Plus, BrainCircuit } from 'lucide-react';
import { DuoSearch } from '../../../components/ui/DuoSearch';
import { ScannerModal } from '../../scanner/components/ScannerModal';
import { VerifyExtraction } from '../../scanner/components/VerifyExtraction';
import { createEventMock } from '../../../core/access/eventAccess';
import { CommunityShortcutCard } from '../../community/components/CommunityShortcutCard';

export const EventsView: React.FC = () => {
  const { domain } = useParams<{ domain: string }>();
  const domainEnum = Object.values(DomainType).find(d => d === domain) as DomainType || DomainType.STUDENT;
  const config = DOMAIN_CONFIGS[domainEnum];

  const { events, loading, filters, setFilters, refresh } = useEventLogic(config);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [aiDraft, setAiDraft] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(e => {
     if (!searchQuery) return true;
     return e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            e.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleScanResult = (data: any) => {
      setAiDraft(data);
      setIsScannerOpen(false);
  };

  const handleConfirmAi = (finalData: any) => {
      const newEvent: GenericEvent = {
          ...finalData,
          id: `ai-${Date.now()}`,
          domain: domainEnum,
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop', // Auto cover
          tags: finalData.aiSuggestedTags || [],
          attendees: 0
      };
      createEventMock(newEvent);
      setAiDraft(null);
      refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-b-2 border-slate-200 pb-6 gap-6">
        <div className="flex-1">
           <h2 className="text-3xl font-bold text-slate-700">{config.eventConfig.labelPlural}</h2>
           <p className="text-slate-400 font-bold text-sm mt-1">
                Official events curated by the Dojo team.
           </p>
        </div>
        
        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
             <div className="w-full sm:w-64">
                <DuoSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search..." />
             </div>
             
             {/* AI SCAN BUTTON */}
             <button 
                onClick={() => setIsScannerOpen(true)}
                className="px-6 py-3 rounded-2xl text-white font-bold text-sm bg-indigo-500 border-b-[6px] border-indigo-700 hover:brightness-110 active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100"
            >
                <BrainCircuit className="w-5 h-5" /> Scan Brief
            </button>

             <button 
                onClick={() => setIsCreateOpen(true)}
                className="px-6 py-3 rounded-2xl text-white font-bold text-sm bg-duo-green border-b-[6px] border-duo-greenDark active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center gap-2"
            >
                <Plus className="w-5 h-5 stroke-[4]" /> Create
            </button>
        </div>
      </div>

      <EventFilter filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1,2,3].map(i => (
                <div key={i} className="h-80 bg-slate-200 rounded-[32px]"></div>
            ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
            
            <CommunityShortcutCard />
        </>
      ) : (
        <div className="space-y-12">
            <DuoCard className="text-center py-20 bg-slate-50 border-slate-200">
                <h3 className="text-xl font-bold text-slate-400">No Official Events Found</h3>
            </DuoCard>
            <CommunityShortcutCard />
        </div>
      )}

      {/* AI MODALS */}
      {isScannerOpen && (
          <ScannerModal 
            domain={domainEnum} 
            onClose={() => setIsScannerOpen(false)} 
            onResult={handleScanResult} 
          />
      )}

      {aiDraft && (
          <VerifyExtraction 
            data={aiDraft} 
            onConfirm={handleConfirmAi} 
            onCancel={() => setAiDraft(null)} 
          />
      )}

      {isCreateOpen && (
          <CreateEventModal 
            domain={domainEnum}
            onClose={() => setIsCreateOpen(false)}
            onSuccess={() => { setIsCreateOpen(false); refresh(); }}
          />
      )}
    </div>
  );
};
