
import React, { useState } from 'react';
import { DomainConfig } from '../../../core/contracts/domainConfig';
import { useProgramLogic } from '../hooks/useProgramLogic';
import { ProgramCard } from './ProgramCard';
import { DuoCard } from '../../../components/DuoCard';
import { SuperDropdown } from '../../../components/ui/SuperDropdown';
import { DuoSearch } from '../../../components/ui/DuoSearch';
import { Crown, Globe } from 'lucide-react';
import { CommunityShortcutCard } from '../../community/components/CommunityShortcutCard';

interface ProgramListProps {
  config: DomainConfig;
}

export const ProgramList: React.FC<ProgramListProps> = ({ config }) => {
  const { programs, loading } = useProgramLogic(config);
  
  // Filtering States
  const [filterTier, setFilterTier] = useState('ALL');
  const [filterRegion, setFilterRegion] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced Filtering Logic
  const filteredPrograms = programs.filter(p => {
      // 1. Text Search
      if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchHost = p.hostName?.toLowerCase().includes(q);
          if (!matchTitle && !matchHost) return false;
      }
      // 2. Dropdown Filters
      if (filterTier !== 'ALL' && p.tier !== filterTier) return false;
      
      return true;
  });

  const TIER_OPTIONS = [
      { id: 'ALL', label: 'All Collections' },
      { id: 'mythic', label: config.programConfig.tierLabels.mythic },
      { id: 'rare', label: config.programConfig.tierLabels.rare },
      { id: 'common', label: config.programConfig.tierLabels.common },
  ];

  const REGION_OPTIONS = [
      { id: 'ALL', label: 'Global' },
      { id: 'remote', label: 'Remote Only' },
      { id: 'local', label: 'On-Site' },
  ];

  if (loading) {
      return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1,2,3].map(i => (
                  <div key={i} className="h-96 bg-slate-200 rounded-[32px]"></div>
              ))}
          </div>
      );
  }

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-slate-200 pb-6 gap-6">
        <div className="w-full md:w-auto">
           <h2 className="text-3xl font-bold text-slate-700">{config.programConfig.entityLabelPlural}</h2>
           <p className="text-slate-400 font-bold text-sm mt-1">
                Found {filteredPrograms.length} official opportunities for you
           </p>
        </div>
        
        <div className="w-full md:w-96">
            <DuoSearch 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={`Search ${config.programConfig.entityLabelPlural}...`}
            />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SuperDropdown 
             label="Collection"
             icon={Crown}
             options={TIER_OPTIONS}
             value={filterTier}
             onChange={setFilterTier}
             color={config.theme === 'green' ? 'green' : 'blue'}
          />
           <SuperDropdown 
             label="Location"
             icon={Globe}
             options={REGION_OPTIONS}
             value={filterRegion}
             onChange={setFilterRegion}
             color="purple"
          />
      </div>

      {/* Grid */}
      {filteredPrograms.length > 0 ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPrograms.map((prog) => (
                    <ProgramCard key={prog.id} program={prog} host={prog.host} config={config} />
                ))}
            </div>
            
            {/* SUPER STANDOUT SHORTCUT */}
            <CommunityShortcutCard />
        </>
      ) : (
        <div className="space-y-12">
            <DuoCard className="text-center py-20 bg-slate-50 border-slate-200">
                <h3 className="text-xl font-bold text-slate-400">No Official {config.programConfig.entityLabelPlural} Found</h3>
                <p className="text-slate-400 mt-2 font-bold">Try adjusting your filters or check the community feed.</p>
            </DuoCard>
            <CommunityShortcutCard />
        </div>
      )}
    </div>
  );
};
