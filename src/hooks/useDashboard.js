import { useQuery } from '@tanstack/react-query';
import * as dashboardService from '../services/dashboardService';

/**
 * Hook to get dashboard statistics
 */
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardService.getDashboardStats,
  });
};

/**
 * Hook to get chart data
 */
export const useChartData = () => {
  return useQuery({
    queryKey: ['dashboard', 'charts'],
    queryFn: dashboardService.getChartData,
  });
};

/**
 * Hook to get recent patients
 */
export const useRecentPatients = () => {
  return useQuery({
    queryKey: ['dashboard', 'recent-patients'],
    queryFn: dashboardService.getRecentPatients,
  });
};
