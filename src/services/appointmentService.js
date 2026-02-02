import { APPOINTMENTS_DATA } from '../mockData';
import { parseISO, isAfter, isBefore, isToday, startOfDay } from 'date-fns';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all appointments
 */
export const getAppointments = async () => {
  await delay();
  return APPOINTMENTS_DATA;
};

/**
 * Get appointment by ID
 */
export const getAppointmentById = async (id) => {
  await delay();
  const appointment = APPOINTMENTS_DATA.find(a => a.id === parseInt(id));
  if (!appointment) throw new Error('Appointment not found');
  return appointment;
};

/**
 * Get appointments by patient ID
 */
export const getAppointmentsByPatient = async (patientId) => {
  await delay();
  return APPOINTMENTS_DATA.filter(a => a.patientId === parseInt(patientId));
};

/**
 * Get today's appointments
 */
export const getTodaysAppointments = async () => {
  await delay();
  const today = new Date().toISOString().split('T')[0];
  return APPOINTMENTS_DATA.filter(a => a.date === today);
};

/**
 * Get upcoming appointments
 */
export const getUpcomingAppointments = async () => {
  await delay();
  const today = startOfDay(new Date());
  return APPOINTMENTS_DATA.filter(a => {
    const appointmentDate = parseISO(a.date);
    return isAfter(appointmentDate, today) || isToday(appointmentDate);
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Get past appointments
 */
export const getPastAppointments = async () => {
  await delay();
  const today = startOfDay(new Date());
  return APPOINTMENTS_DATA.filter(a => {
    const appointmentDate = parseISO(a.date);
    return isBefore(appointmentDate, today);
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Create new appointment
 */
export const createAppointment = async (appointmentData) => {
  await delay();
  const newAppointment = {
    id: Math.max(...APPOINTMENTS_DATA.map(a => a.id)) + 1,
    ...appointmentData,
    status: 'Pending',
  };
  APPOINTMENTS_DATA.push(newAppointment);
  return newAppointment;
};

/**
 * Update appointment
 */
export const updateAppointment = async (id, appointmentData) => {
  await delay();
  const index = APPOINTMENTS_DATA.findIndex(a => a.id === parseInt(id));
  if (index === -1) throw new Error('Appointment not found');
  
  APPOINTMENTS_DATA[index] = { ...APPOINTMENTS_DATA[index], ...appointmentData };
  return APPOINTMENTS_DATA[index];
};

/**
 * Delete appointment
 */
export const deleteAppointment = async (id) => {
  await delay();
  const index = APPOINTMENTS_DATA.findIndex(a => a.id === parseInt(id));
  if (index === -1) throw new Error('Appointment not found');
  
  APPOINTMENTS_DATA.splice(index, 1);
  return { success: true };
};

/**
 * Update appointment status
 */
export const updateAppointmentStatus = async (id, status) => {
  return updateAppointment(id, { status });
};
