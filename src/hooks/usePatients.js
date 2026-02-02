import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as patientService from '../services/patientService';

/**
 * Hook to get all patients
 */
export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getPatients,
  });
};

/**
 * Hook to get patient by ID
 */
export const usePatient = (id) => {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => patientService.getPatientById(id),
    enabled: !!id,
  });
};

/**
 * Hook to create patient
 */
export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: patientService.createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

/**
 * Hook to update patient
 */
export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => patientService.updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      queryClient.invalidateQueries({ queryKey: ['patient'] });
    },
  });
};

/**
 * Hook to delete patient
 */
export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: patientService.deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

/**
 * Hook to search patients
 */
export const useSearchPatients = (query) => {
  return useQuery({
    queryKey: ['patients', 'search', query],
    queryFn: () => patientService.searchPatients(query),
    enabled: query.length > 0,
  });
};
