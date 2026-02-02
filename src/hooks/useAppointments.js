import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as appointmentService from '../services/appointmentService';

/**
 * Hook to get all appointments
 */
export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentService.getAppointments,
  });
};

/**
 * Hook to get today's appointments
 */
export const useTodaysAppointments = () => {
  return useQuery({
    queryKey: ['appointments', 'today'],
    queryFn: appointmentService.getTodaysAppointments,
  });
};

/**
 * Hook to get upcoming appointments
 */
export const useUpcomingAppointments = () => {
  return useQuery({
    queryKey: ['appointments', 'upcoming'],
    queryFn: appointmentService.getUpcomingAppointments,
  });
};

/**
 * Hook to get appointments by patient
 */
export const usePatientAppointments = (patientId) => {
  return useQuery({
    queryKey: ['appointments', 'patient', patientId],
    queryFn: () => appointmentService.getAppointmentsByPatient(patientId),
    enabled: !!patientId,
  });
};

/**
 * Hook to create appointment
 */
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: appointmentService.createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};

/**
 * Hook to update appointment
 */
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => appointmentService.updateAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};

/**
 * Hook to update appointment status
 */
export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }) => appointmentService.updateAppointmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};
