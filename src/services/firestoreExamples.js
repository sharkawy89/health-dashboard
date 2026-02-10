/**
 * Example usage of Firestore services
 * This file demonstrates how to use the Firestore database operations
 */

// ============================================
// 1. PATIENTS OPERATIONS
// ============================================

import {
  addPatient,
  getAllPatients,
  getPatientById,
  searchPatients,
  updatePatient,
  deletePatient,
  getPatientsByDisease,
  getPatientsByBloodType
} from './firestorePatients';

// Add a new patient
export const addNewPatientExample = async () => {
  try {
    const patientId = await addPatient({
      fullName: 'John Doe',
      gender: 'Male',
      dob: '1990-01-15',
      phone: '+1234567890',
      email: 'john@example.com',
      address: '123 Main St, City',
      bloodType: 'O+',
      chronicDiseases: ['Hypertension', 'Diabetes']
    });
    console.log('Patient created:', patientId);
    return patientId;
  } catch (error) {
    console.error('Failed to add patient:', error);
  }
};

// Get all patients
export const loadAllPatients = async () => {
  try {
    const patients = await getAllPatients();
    console.log('All patients:', patients);
    return patients;
  } catch (error) {
    console.error('Failed to load patients:', error);
  }
};

// Search for a patient
export const findPatient = async (term) => {
  try {
    const results = await searchPatients(term);
    console.log('Search results:', results);
    return results;
  } catch (error) {
    console.error('Failed to search patients:', error);
  }
};

// Update patient information
export const updatePatientInfo = async (patientId, newData) => {
  try {
    await updatePatient(patientId, newData);
    console.log('Patient updated');
  } catch (error) {
    console.error('Failed to update patient:', error);
  }
};

// ============================================
// 2. APPOINTMENTS OPERATIONS
// ============================================

import {
  addAppointment,
  getAllAppointments,
  getAppointmentById,
  getPatientAppointments,
  getAppointmentsByStatus,
  updateAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getTodayAppointments
} from './firestoreAppointments';

// Add a new appointment
export const addNewAppointmentExample = async () => {
  try {
    const appointmentId = await addAppointment({
      patientId: 'patient-id-here',
      doctorName: 'Dr. Ahmed Hassan',
      date: new Date('2026-02-15'),
      time: '10:00 AM',
      type: 'Consultation',
      status: 'Pending',
      notes: 'Regular checkup'
    });
    console.log('Appointment created:', appointmentId);
    return appointmentId;
  } catch (error) {
    console.error('Failed to add appointment:', error);
  }
};

// Get today's appointments
export const loadTodayAppointments = async () => {
  try {
    const appointments = await getTodayAppointments();
    console.log('Today appointments:', appointments);
    return appointments;
  } catch (error) {
    console.error('Failed to load appointments:', error);
  }
};

// Update appointment status
export const changeAppointmentStatus = async (appointmentId, newStatus) => {
  try {
    await updateAppointmentStatus(appointmentId, newStatus);
    console.log('Appointment status updated to:', newStatus);
  } catch (error) {
    console.error('Failed to update appointment status:', error);
  }
};

// ============================================
// 3. MEDICAL RECORDS OPERATIONS
// ============================================

import {
  addMedicalRecord,
  getAllMedicalRecords,
  getPatientMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord
} from './firestoreMedicalRecords';

// Add a medical record
export const addNewMedicalRecord = async () => {
  try {
    const recordId = await addMedicalRecord({
      patientId: 'patient-id-here',
      type: 'Diagnosis',
      title: 'Hypertension Diagnosis',
      description: 'Patient diagnosed with stage 2 hypertension',
      doctorName: 'Dr. John Smith',
      notes: 'Prescribed medication'
    });
    console.log('Medical record created:', recordId);
    return recordId;
  } catch (error) {
    console.error('Failed to add medical record:', error);
  }
};

// Get patient's medical records
export const getPatientRecords = async (patientId) => {
  try {
    const records = await getPatientMedicalRecords(patientId);
    console.log('Patient medical records:', records);
    return records;
  } catch (error) {
    console.error('Failed to load medical records:', error);
  }
};

// ============================================
// 4. USERS (STAFF) OPERATIONS
// ============================================

import {
  addUser,
  getAllUsers,
  getUserById,
  getUsersByRole,
  getActiveUsers,
  updateUser,
  deactivateUser,
  activateUser,
  deleteUser
} from './firestoreUsers';

// Add a new user (doctor/staff)
export const addNewUserExample = async () => {
  try {
    const userId = await addUser({
      name: 'Dr. Ahmed Hassan',
      email: 'ahmed@clinic.com',
      role: 'Doctor',
      department: 'General Medicine',
      phone: '+1234567890',
      isActive: true
    });
    console.log('User created:', userId);
    return userId;
  } catch (error) {
    console.error('Failed to add user:', error);
  }
};

// Get all doctors
export const loadAllDoctors = async () => {
  try {
    const doctors = await getUsersByRole('Doctor');
    console.log('All doctors:', doctors);
    return doctors;
  } catch (error) {
    console.error('Failed to load doctors:', error);
  }
};

// ============================================
// USAGE IN COMPONENTS
// ============================================

/**
 * Example: Using in a React component
 * 
 * import { useEffect, useState } from 'react';
 * import { getAllPatients } from './firestorePatients';
 * 
 * function PatientList() {
 *   const [patients, setPatients] = useState([]);
 *   const [loading, setLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     const loadPatients = async () => {
 *       try {
 *         const data = await getAllPatients();
 *         setPatients(data);
 *       } catch (error) {
 *         console.error('Error loading patients:', error);
 *       } finally {
 *         setLoading(false);
 *       }
 *     };
 * 
 *     loadPatients();
 *   }, []);
 * 
 *   if (loading) return <div>Loading...</div>;
 * 
 *   return (
 *     <div>
 *       {patients.map(patient => (
 *         <div key={patient.id}>
 *           <h3>{patient.fullName}</h3>
 *           <p>{patient.email}</p>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * 
 * export default PatientList;
 */
