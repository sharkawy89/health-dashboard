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
  orderBy,
  limit,
  QueryConstraint
} from 'firebase/firestore';

/**
 * Add a new patient to Firestore
 */
export const addPatient = async (patientData) => {
  try {
    const docRef = await addDoc(collection(db, 'patients'), {
      ...patientData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Patient added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

/**
 * Get all patients
 */
export const getAllPatients = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'patients'));
    const patients = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return patients;
  } catch (error) {
    console.error('Error getting patients:', error);
    throw error;
  }
};

/**
 * Get a single patient by ID
 */
export const getPatientById = async (patientId) => {
  try {
    const docRef = doc(db, 'patients', patientId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.log('Patient not found');
      return null;
    }
  } catch (error) {
    console.error('Error getting patient:', error);
    throw error;
  }
};

/**
 * Search patients by name, email, or phone
 */
export const searchPatients = async (searchTerm) => {
  try {
    const snapshot = await getDocs(collection(db, 'patients'));
    const patients = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(patient => {
        const term = searchTerm.toLowerCase();
        return (
          patient.fullName?.toLowerCase().includes(term) ||
          patient.email?.toLowerCase().includes(term) ||
          patient.phone?.includes(term)
        );
      });
    return patients;
  } catch (error) {
    console.error('Error searching patients:', error);
    throw error;
  }
};

/**
 * Update patient information
 */
export const updatePatient = async (patientId, updateData) => {
  try {
    const docRef = doc(db, 'patients', patientId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
    console.log('Patient updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

/**
 * Delete a patient
 */
export const deletePatient = async (patientId) => {
  try {
    await deleteDoc(doc(db, 'patients', patientId));
    console.log('Patient deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting patient:', error);
    throw error;
  }
};

/**
 * Get patients by chronic disease
 */
export const getPatientsByDisease = async (disease) => {
  try {
    const q = query(collection(db, 'patients'), where('chronicDiseases', 'array-contains', disease));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting patients by disease:', error);
    throw error;
  }
};

/**
 * Get patients by blood type
 */
export const getPatientsByBloodType = async (bloodType) => {
  try {
    const q = query(collection(db, 'patients'), where('bloodType', '==', bloodType));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting patients by blood type:', error);
    throw error;
  }
};
