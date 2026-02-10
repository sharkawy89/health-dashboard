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
 * Add a new user (doctor/staff)
 */
export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    });
    console.log('User added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

/**
 * Get all users
 */
export const getAllUsers = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

/**
 * Get users by role
 */
export const getUsersByRole = async (role) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('role', '==', role)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting users by role:', error);
    throw error;
  }
};

/**
 * Get active users
 */
export const getActiveUsers = async () => {
  try {
    const q = query(
      collection(db, 'users'),
      where('isActive', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting active users:', error);
    throw error;
  }
};

/**
 * Update user information
 */
export const updateUser = async (userId, updateData) => {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
    console.log('User updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

/**
 * Deactivate user
 */
export const deactivateUser = async (userId) => {
  try {
    return await updateUser(userId, { isActive: false });
  } catch (error) {
    console.error('Error deactivating user:', error);
    throw error;
  }
};

/**
 * Activate user
 */
export const activateUser = async (userId) => {
  try {
    return await updateUser(userId, { isActive: true });
  } catch (error) {
    console.error('Error activating user:', error);
    throw error;
  }
};

/**
 * Delete user
 */
export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
    console.log('User deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

/**
 * Get user by email
 */
export const getUserByEmail = async (email) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('email', '==', email)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.length > 0 ? {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data()
    } : null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

/**
 * Search users by name
 */
export const searchUsers = async (searchTerm) => {
  try {
    const snapshot = await getDocs(collection(db, 'users'));
    return snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(user => {
        const term = searchTerm.toLowerCase();
        return (
          user.name?.toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term)
        );
      });
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};
