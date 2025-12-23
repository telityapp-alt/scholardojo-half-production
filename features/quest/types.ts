import { DomainType } from '../../core/contracts/entityMap';

export interface QuestSubtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface LinkedEntity {
  type: 'CUSTOM' | 'CAMPUS' | 'PROGRAM' | 'SCHOLARSHIP';
  name: string;
}

export interface QuestCard {
  id: string;
  domain: DomainType; // Added for isolation
  columnId: string;
  title: string;
  deadline?: string;
  priority: 'Low' | 'Medium' | 'High';
  linkedEntity?: LinkedEntity;
  subtasks: QuestSubtask[];
  tags?: string[];
}

export interface QuestColumn {
  id: string;
  title: string;
  color: 'sky' | 'orange' | 'green' | 'purple' | 'pink';
}