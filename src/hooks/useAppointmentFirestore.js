import { useState, useEffect } from 'react';
import {
  addAppointment,
  getAllAppointments,
  getTodayAppointments,
  getPatientAppointments,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentById
} from '../services/firestoreAppointments';

/**
 * Hook for appointment operations
 */
export const useAppointmentFirestore = (appointmentId = null, patientId = null) => {
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all appointments
  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAllAppointments();
      setAppointments(data);
      setError(null);
    } catch (err) {
      console.error('Error loading appointments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load today's appointments
  const loadTodayAppointments = async () => {
    try {
      setLoading(true);
      const data = await getTodayAppointments();
      setTodayAppointments(data);
      setError(null);
    } catch (err) {
      console.error('Error loading today appointments:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load single appointment
  useEffect(() => {
    if (appointmentId) {
      const loadAppointment = async () => {
        try {
          setLoading(true);
          const data = await getAppointmentById(appointmentId);
          setAppointment(data);
          setError(null);
        } catch (err) {
          console.error('Error loading appointment:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadAppointment();
    }
  }, [appointmentId]);

  // Load patient appointments
  useEffect(() => {
    if (patientId) {
      const loadPatientAppointments = async () => {
        try {
          setLoading(true);
          const data = await getPatientAppointments(patientId);
          setAppointments(data);
          setError(null);
        } catch (err) {
          console.error('Error loading patient appointments:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadPatientAppointments();
    }
  }, [patientId]);

  // Create appointment
  const create = async (data) => {
    try {
      setLoading(true);
      const id = await addAppointment(data);
      await loadAppointments();
      setError(null);
      return id;
    } catch (err) {
      console.error('Error creating appointment:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update appointment
  const update = async (id, data) => {
    try {
      setLoading(true);
      await updateAppointment(id, data);
      await loadAppointments();
      setError(null);
    } catch (err) {
      console.error('Error updating appointment:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      await updateAppointmentStatus(id, status);
      await loadAppointments();
      setError(null);
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete appointment
  const remove = async (id) => {
    try {
      setLoading(true);
      await deleteAppointment(id);
      await loadAppointments();
      setError(null);
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    appointment,
    todayAppointments,
    loading,
    error,
    loadAppointments,
    loadTodayAppointments,
    create,
    update,
    updateStatus,
    remove
  };
};
