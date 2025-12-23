
import { TabConfig } from '../types/navigation';

export interface UserLevel {
  currentLevel: number;
  currentXP: number;
  totalXPForNext: number;
  progressPercent: number;
}

// XP Rewards Constants
export const REWARDS = {
    QUEST_COMPLETED: 50,
    SUBTASK_COMPLETED: 5,
    ARENA_VICTORY: 250,
    ARENA_DAMAGE: 2, // per % damage
    AI_SCAN_SUCCESS: 30,
    SAVED_ITEM: 10,
    DAILY_STREAK: 100
};

// Formula: level = floor(sqrt(XP / 50)) + 1
// This makes levels increasingly harder to reach
export const calculateLevelFromXP = (totalXP: number): UserLevel => {
  const currentLevel = Math.floor(Math.sqrt(totalXP / 50)) + 1;
  
  // XP required for current level start
  const xpForCurrentLevel = Math.pow(currentLevel - 1, 2) * 50;
  // XP required for next level start
  const xpForNextLevel = Math.pow(currentLevel, 2) * 50;
  
  const xpInCurrentLevel = totalXP - xpForCurrentLevel;
  const xpRequiredForThisLevel = xpForNextLevel - xpForCurrentLevel;
  
  return {
    currentLevel,
    currentXP: totalXP,
    totalXPForNext: xpForNextLevel,
    progressPercent: Math.min(99.9, (xpInCurrentLevel / xpRequiredForThisLevel) * 100)
  };
};

export const isTabUnlocked = (tab: TabConfig, userLevel: number): boolean => {
  return tab.levelRequired <= userLevel;
};
