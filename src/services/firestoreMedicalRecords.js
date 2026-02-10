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
 * Add medical record for a patient
 */
export const addMedicalRecord = async (medicalRecordData) => {
  try {
    const docRef = await addDoc(collection(db, 'medicalRecords'), {
      ...medicalRecordData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Medical record added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding medical record:', error);
    throw error;
  }
};

/**
 * Get all medical records
 */
export const getAllMedicalRecords = async () => {
  try {
    const q = query(collection(db, 'medicalRecords'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting medical records:', error);
    throw error;
  }
};

/**
 * Get medical records for a specific patient
 */
export const getPatientMedicalRecords = async (patientId) => {
  try {
    const q = query(
      collection(db, 'medicalRecords'),
      where('patientId', '==', patientId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting patient medical records:', error);
    throw error;
  }
};

/**
 * Get medical record by ID
 */
export const getMedicalRecordById = async (recordId) => {
  try {
    const docRef = doc(db, 'medicalRecords', recordId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting medical record:', error);
    throw error;
  }
};

/**
 * Update medical record
 */
export const updateMedicalRecord = async (recordId, updateData) => {
  try {
    const docRef = doc(db, 'medicalRecords', recordId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
    console.log('Medical record updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating medical record:', error);
    throw error;
  }
};

/**
 * Delete medical record
 */
export const deleteMedicalRecord = async (recordId) => {
  try {
    await deleteDoc(doc(db, 'medicalRecords', recordId));
    console.log('Medical record deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting medical record:', error);
    throw error;
  }
};

/**
 * Search medical records by patient and date range
 */
export const searchMedicalRecords = async (patientId, startDate, endDate) => {
  try {
    const q = query(
      collection(db, 'medicalRecords'),
      where('patientId', '==', patientId),
      where('createdAt', '>=', startDate),
      where('createdAt', '<=', endDate),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error searching medical records:', error);
    throw error;
  }
};

/**
 * Get records by type (diagnosis, prescription, lab, etc.)
 */
export const getMedicalRecordsByType = async (patientId, recordType) => {
  try {
    const q = query(
      collection(db, 'medicalRecords'),
      where('patientId', '==', patientId),
      where('type', '==', recordType),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting medical records by type:', error);
    throw error;
  }
};
