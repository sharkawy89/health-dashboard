import { PATIENTS_DATA } from '../mockData';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get all patients
 */
export const getPatients = async () => {
  await delay();
  return PATIENTS_DATA;
};

/**
 * Get patient by ID
 */
export const getPatientById = async (id) => {
  await delay();
  const patient = PATIENTS_DATA.find(p => p.id === parseInt(id));
  if (!patient) throw new Error('Patient not found');
  return patient;
};

/**
 * Search patients
 */
export const searchPatients = async (query) => {
  await delay(300);
  const lowerQuery = query.toLowerCase();
  return PATIENTS_DATA.filter(patient =>
    patient.fullName.toLowerCase().includes(lowerQuery) ||
    patient.email.toLowerCase().includes(lowerQuery) ||
    patient.phone.includes(query) ||
    patient.id.toString().includes(query)
  );
};

/**
 * Create new patient
 */
export const createPatient = async (patientData) => {
  await delay();
  const newPatient = {
    id: Math.max(...PATIENTS_DATA.map(p => p.id)) + 1,
    ...patientData,
    lastVisit: new Date().toISOString().split('T')[0],
  };
  PATIENTS_DATA.push(newPatient);
  return newPatient;
};

/**
 * Update patient
 */
export const updatePatient = async (id, patientData) => {
  await delay();
  const index = PATIENTS_DATA.findIndex(p => p.id === parseInt(id));
  if (index === -1) throw new Error('Patient not found');
  
  PATIENTS_DATA[index] = { ...PATIENTS_DATA[index], ...patientData };
  return PATIENTS_DATA[index];
};

/**
 * Delete patient
 */
export const deletePatient = async (id) => {
  await delay();
  const index = PATIENTS_DATA.findIndex(p => p.id === parseInt(id));
  if (index === -1) throw new Error('Patient not found');
  
  PATIENTS_DATA.splice(index, 1);
  return { success: true };
};
