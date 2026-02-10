import { useState, useEffect } from 'react';
import {
  addPatient,
  getAllPatients,
  searchPatients,
  updatePatient,
  deletePatient,
  getPatientById
} from '../services/firestorePatients';

/**
 * Hook for patient operations
 */
export const usePatientFirestore = (patientId = null) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all patients
  const loadPatients = async () => {
    try {
      setLoading(true);
      const data = await getAllPatients();
      setPatients(data);
      setError(null);
    } catch (err) {
      console.error('Error loading patients:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load single patient
  useEffect(() => {
    if (patientId) {
      const loadPatient = async () => {
        try {
          setLoading(true);
          const data = await getPatientById(patientId);
          setPatient(data);
          setError(null);
        } catch (err) {
          console.error('Error loading patient:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      loadPatient();
    }
  }, [patientId]);

  // Create patient
  const create = async (data) => {
    try {
      setLoading(true);
      const id = await addPatient(data);
      await loadPatients();
      setError(null);
      return id;
    } catch (err) {
      console.error('Error creating patient:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update patient
  const update = async (id, data) => {
    try {
      setLoading(true);
      await updatePatient(id, data);
      await loadPatients();
      setError(null);
    } catch (err) {
      console.error('Error updating patient:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete patient
  const remove = async (id) => {
    try {
      setLoading(true);
      await deletePatient(id);
      await loadPatients();
      setError(null);
    } catch (err) {
      console.error('Error deleting patient:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Search patients
  const search = async (term) => {
    try {
      setLoading(true);
      const results = await searchPatients(term);
      setPatients(results);
      setError(null);
      return results;
    } catch (err) {
      console.error('Error searching patients:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    patients,
    patient,
    loading,
    error,
    loadPatients,
    create,
    update,
    remove,
    search
  };
};
