import { CHART_DATA, PATIENTS_DATA, APPOINTMENTS_DATA } from '../mockData';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async () => {
  await delay();
  
  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = APPOINTMENTS_DATA.filter(a => a.date === today);
  const pendingAppointments = APPOINTMENTS_DATA.filter(a => a.status === 'Pending');
  
  return {
    totalPatients: PATIENTS_DATA.length,
    appointmentsToday: todaysAppointments.length,
    pendingReports: pendingAppointments.length,
    revenue: 45250, // Mock revenue
  };
};

/**
 * Get chart data
 */
export const getChartData = async () => {
  await delay();
  return CHART_DATA;
};

/**
 * Get recent patients (last 5)
 */
export const getRecentPatients = async () => {
  await delay();
  return [...PATIENTS_DATA]
    .sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit))
    .slice(0, 5);
};
