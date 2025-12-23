
import { DomainType } from './entityMap';
import { BookOpen, Briefcase, Layout, Map, Target, Trophy, User, Calendar, FileCheck, Zap, School, Wrench, Crosshair, Swords, MessageSquare, Building, Home, Dumbbell, Compass, TrendingUp, Users, Library } from 'lucide-react';

// ---------------------------------------------------------------------------
// FEATURE REGISTRY
// Controls visibility and routing.
// ---------------------------------------------------------------------------

export const NAV_ICON_MAP: Record<string, any> = {
  'program': BookOpen,
  'host': Briefcase,
  'tracker': Layout,
  'map': Map,
  'profile': User,
  'target': Target,
  'trophy': Trophy,
  'BookOpen': BookOpen,
  'Briefcase': Briefcase,
  'LayoutDashboard': Layout, // Mapping generic
  'Map': Map,
  'User': User,
  'Target': Target,
  'Trophy': Trophy,
  'Calendar': Calendar,
  'FileCheck': FileCheck,
  'Zap': Zap,
  'School': School,
  'Wrench': Wrench,
  'Crosshair': Crosshair,
  'Swords': Swords,
  'MessageSquare': MessageSquare,
  'Building': Building,
  'Home': Home,
  'Dumbbell': Dumbbell,
  'Compass': Compass,
  'TrendingUp': TrendingUp,
  'Users': Users,
  'Library': Library
};

export interface FeatureDef {
  id: string;
  labelKey: string; // Key to look up in DomainLabels
  path: string;
  icon: string;
  allowedDomains: DomainType[];
}

// Ideally this evolves into a dynamic registry, currently static for Phase 1
export const CORE_FEATURES: FeatureDef[] = [
  { id: 'program', labelKey: 'program', path: '/programs', icon: 'program', allowedDomains: [DomainType.STUDENT, DomainType.INTERN, DomainType.SCHOLAR] },
  { id: 'tracker', labelKey: 'tracker', path: '/tracker', icon: 'tracker', allowedDomains: [DomainType.STUDENT, DomainType.INTERN, DomainType.SCHOLAR] },
  { id: 'host', labelKey: 'hostEntity', path: '/hosts', icon: 'host', allowedDomains: [DomainType.STUDENT, DomainType.INTERN, DomainType.SCHOLAR] },
];
