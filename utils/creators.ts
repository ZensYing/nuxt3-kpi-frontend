// utils/creators.ts

export interface IRemark {
  id: number;
  status: string;
  title: string;
  video_link: string;
  view: string | null;
  creators: number;
}

export interface ICreator {
  id: number;
  status: string;
  staff: string;
  target: string;
  remarks: IRemark[];
  user_created: {
    id: string;
    first_name: string;
    last_name: string;
    department: string | null;
  };
  note?: string;
}

/**
 * Calculate total views from a list of remarks
 * @param remarks List of remarks containing view data
 * @returns Total views as a string
 */
export const getTotalViews = (remarks: IRemark[]): string => {
  if (!remarks || remarks.length === 0) return '0';

  let total = 0;
  remarks.forEach(remark => {
    if (remark.view) {
      total += parseInt(remark.view);
    }
  });

  return total.toString();
};

/**
 * Check if a creator has completed their target
 * @param creator Creator object with target and remarks
 * @returns boolean indicating if target is completed
 */
export const isCompleted = (creator: ICreator): boolean => {
  if (creator.status === 'completed') return true;

  const totalViews = parseInt(getTotalViews(creator.remarks) || '0');
  const target = parseInt(creator.target || '0');

  return totalViews >= target;
};

/**
 * Calculate percentage of target achieved
 * @param creator Creator object with target and remarks
 * @returns Percentage as a number
 */
export const calculatePercent = (creator: ICreator): number => {
  const totalViews = parseInt(getTotalViews(creator.remarks) || '0');
  const target = parseInt(creator.target || '0');

  if (target === 0) return 0;
  return Math.round((totalViews / target) * 100);
};

/**
 * Get the appropriate CSS class for percentage display
 * @param percent Percentage value
 * @returns CSS class string
 */
export const getPercentClass = (percent: number) => {
  if (percent >= 100) return 'text-green-600 font-bold';
  if (percent >= 75) return 'text-blue-600 font-bold';
  return 'text-pink-600 font-bold';
};

/**
 * Get the appropriate CSS class for progress bar
 * @param percent Percentage value
 * @returns CSS class string
 */
export const getProgressBarColor = (percent: number) => {
  if (percent >= 100) return 'bg-green-600';
  if (percent >= 75) return 'bg-blue-600';
  return 'bg-pink-600';
};

/**
 * Calculate the total number of completed targets
 * @param creators List of creators
 * @returns Number of completed targets
 */
export const getCompletedTargetsCount = (creators: ICreator[]): number => {
  return creators.filter(isCompleted).length;
};

/**
 * Calculate the total number of active creators
 * @param creators List of creators
 * @returns Number of active creators
 */
export const getActiveCreatorsCount = (creators: ICreator[]): number => {
  return creators.filter(creator => creator.status === 'active').length;
};

/**
 * Calculate the total views across all creators
 * @param creators List of creators
 * @returns Total views formatted string
 */
export const getTotalViewsAcrossAll = (creators: ICreator[]): string => {
  let totalViews = 0;
  creators.forEach(creator => {
    totalViews += parseInt(getTotalViews(creator.remarks) || '0');
  });
  return totalViews.toString();
};

/**
 * Calculate the total number of videos
 * @param creators List of creators
 * @returns Total number of videos
 */
export const getTotalVideosCount = (creators: ICreator[]): number => {
  return creators.reduce((total, creator) => total + (creator.remarks?.length || 0), 0);
};

import { ref, computed } from 'vue';

const creators = ref<ICreator[]>([]);

export const creatorsList = computed(() => {
  return creators.value;
});
