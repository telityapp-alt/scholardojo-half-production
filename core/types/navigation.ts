
import { DomainType } from '../contracts/entityMap';

export type ParentMenuId = 'skillspace' | 'workspace' | 'progress' | 'discovery' | 'community' | 'admin';

export interface TabConfig {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  route: string;
  levelRequired: number; // 0 = unlocked
  comingSoon?: boolean;
  component: string; // Key for Component Registry
}

export interface ParentMenuConfig {
  id: ParentMenuId;
  label: string; // Default label
  icon: string; // Lucide icon name
  description: string;
  tabs: TabConfig[];
  defaultTab: string;
  color: 'green' | 'blue' | 'purple' | 'orange' | 'pink' | 'red'; // Theme color
}

export interface DomainNavOverride {
  parentLabels: Record<ParentMenuId, string>;
  tabLabels: Record<string, string>; // tabId -> label override
  iconOverrides?: Record<string, string>;
}

export interface NavigationRegistry {
  parents: ParentMenuConfig[];
  domainOverrides: Record<DomainType, DomainNavOverride>;
}
