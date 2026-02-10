import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore';

/**
 * Add a new appointment
 */
export const addAppointment = async (appointmentData) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Appointment added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding appointment:', error);
    throw error;
  }
};

/**
 * Get all appointments
 */
export const getAllAppointments = async () => {
  try {
    const q = query(collection(db, 'appointments'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting appointments:', error);
    throw error;
  }
};

/**
 * Get appointment by ID
 */
export const getAppointmentById = async (appointmentId) => {
  try {
    const docRef = doc(db, 'appointments', appointmentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting appointment:', error);
    throw error;
  }
};

/**
 * Get appointments for a specific patient
 */
export const getPatientAppointments = async (patientId) => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('patientId', '==', patientId),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting patient appointments:', error);
    throw error;
  }
};

/**
 * Get appointments by status
 */
export const getAppointmentsByStatus = async (status) => {
  try {
    const q = query(
      collection(db, 'appointments'),
      where('status', '==', status),
      orderBy('date', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting appointments by status:', error);
    throw error;
  }
};

/**
 * Update appointment
 */
export const updateAppointment = async (appointmentId, updateData) => {
  try {
    const docRef = doc(db, 'appointments', appointmentId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
    console.log('Appointment updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error;
  }
};

/**
 * Update appointment status
 */
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    return await updateAppointment(appointmentId, { status });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

/**
 * Delete appointment
 */
export const deleteAppointment = async (appointmentId) => {
  try {
    await deleteDoc(doc(db, 'appointments', appointmentId));
    console.log('Appointment deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

/**
 * Get today's appointments
 */
export const getTodayAppointments = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const q = query(
      collection(db, 'appointments'),
      where('date', '>=', today),
      where('date', '<', tomorrow),
      orderBy('date', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting today appointments:', error);
    throw error;
  }
};
