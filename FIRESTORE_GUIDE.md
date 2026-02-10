# 🗄️ Firestore Database Integration Guide

Complete guide for using Firestore database with EL3eyada.

---

## 📋 Overview

The application is integrated with Firebase Firestore for data persistence. Firestore is a cloud-hosted NoSQL database perfect for real-time applications.

---

## 🏗️ Database Collections

### 1. **Patients** Collection
```javascript
{
  id: "auto-generated",
  fullName: "John Doe",
  gender: "Male",
  dob: "1990-01-15",
  phone: "+1234567890",
  email: "john@example.com",
  address: "123 Main St",
  bloodType: "O+",
  chronicDiseases: ["Hypertension", "Diabetes"],
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 2. **Appointments** Collection
```javascript
{
  id: "auto-generated",
  patientId: "reference-to-patient",
  doctorName: "Dr. Ahmed Hassan",
  date: timestamp,
  time: "10:00 AM",
  type: "Consultation", // Consultation, Follow-up, Emergency, Surgery
  status: "Pending", // Pending, Confirmed, Completed, Cancelled
  notes: "Regular checkup",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 3. **Medical Records** Collection
```javascript
{
  id: "auto-generated",
  patientId: "reference-to-patient",
  type: "Diagnosis", // Diagnosis, Prescription, Lab, Surgery, etc.
  title: "Hypertension Diagnosis",
  description: "Patient diagnosed with stage 2 hypertension",
  doctorName: "Dr. John Smith",
  notes: "Prescribed medication",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 4. **Users** Collection (Doctors/Staff)
```javascript
{
  id: "auto-generated",
  name: "Dr. Ahmed Hassan",
  email: "ahmed@clinic.com",
  role: "Doctor", // Doctor, Nurse, Admin, Receptionist
  department: "General Medicine",
  phone: "+1234567890",
  isActive: true,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## 🚀 Service Files

### **firestorePatients.js**
Functions for patient operations:
- `addPatient(data)` - Add new patient
- `getAllPatients()` - Get all patients
- `getPatientById(id)` - Get specific patient
- `searchPatients(term)` - Search patients
- `updatePatient(id, data)` - Update patient
- `deletePatient(id)` - Delete patient
- `getPatientsByDisease(disease)` - Filter by disease
- `getPatientsByBloodType(type)` - Filter by blood type

### **firestoreAppointments.js**
Functions for appointment operations:
- `addAppointment(data)` - Schedule appointment
- `getAllAppointments()` - Get all appointments
- `getAppointmentById(id)` - Get specific appointment
- `getPatientAppointments(patientId)` - Get patient's appointments
- `getAppointmentsByStatus(status)` - Filter by status
- `updateAppointment(id, data)` - Update appointment
- `updateAppointmentStatus(id, status)` - Update status
- `deleteAppointment(id)` - Delete appointment
- `getTodayAppointments()` - Get today's appointments

### **firestoreMedicalRecords.js**
Functions for medical records:
- `addMedicalRecord(data)` - Add medical record
- `getAllMedicalRecords()` - Get all records
- `getPatientMedicalRecords(patientId)` - Get patient's records
- `getMedicalRecordById(id)` - Get specific record
- `updateMedicalRecord(id, data)` - Update record
- `deleteMedicalRecord(id)` - Delete record

### **firestoreUsers.js**
Functions for user management:
- `addUser(data)` - Add new user
- `getAllUsers()` - Get all users
- `getUserById(id)` - Get specific user
- `getUsersByRole(role)` - Filter by role
- `getActiveUsers()` - Get active users
- `updateUser(id, data)` - Update user
- `deactivateUser(id)` - Deactivate user
- `activateUser(id)` - Activate user
- `deleteUser(id)` - Delete user

---

## 🎣 React Hooks

### **usePatientFirestore.js**
```javascript
const {
  patients,        // Array of patients
  patient,         // Single patient
  loading,         // Loading state
  error,           // Error message
  loadPatients,    // Function to reload
  create,          // Add new patient
  update,          // Update patient
  remove,          // Delete patient
  search           // Search patients
} = usePatientFirestore(patientId);
```

### **useAppointmentFirestore.js**
```javascript
const {
  appointments,         // All appointments
  appointment,          // Single appointment
  todayAppointments,    // Today's appointments
  loading,              // Loading state
  error,                // Error message
  loadAppointments,     // Reload all
  loadTodayAppointments,// Reload today's
  create,               // Add appointment
  update,               // Update appointment
  updateStatus,         // Update status
  remove                // Delete appointment
} = useAppointmentFirestore(appointmentId, patientId);
```

---

## 💻 Usage Examples

### Example 1: Add Patient

```javascript
import { addPatient } from './services/firestorePatients';

const handleAddPatient = async () => {
  try {
    const patientId = await addPatient({
      fullName: 'Jane Smith',
      gender: 'Female',
      dob: '1985-05-20',
      phone: '+9876543210',
      email: 'jane@example.com',
      address: '456 Oak Ave',
      bloodType: 'A+',
      chronicDiseases: []
    });
    alert('Patient added: ' + patientId);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Example 2: Use Hook in Component

```javascript
import { usePatientFirestore } from './hooks/usePatientFirestore';

function PatientList() {
  const { patients, loading, error, loadPatients } = usePatientFirestore();

  useEffect(() => {
    loadPatients();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {patients.map(patient => (
        <li key={patient.id}>
          {patient.fullName} - {patient.email}
        </li>
      ))}
    </ul>
  );
}
```

### Example 3: Search Patients

```javascript
import { searchPatients } from './services/firestorePatients';

const handleSearch = async (searchTerm) => {
  try {
    const results = await searchPatients(searchTerm);
    console.log('Found patients:', results);
    setResults(results);
  } catch (error) {
    console.error('Search error:', error);
  }
};
```

### Example 4: Update Appointment Status

```javascript
import { updateAppointmentStatus } from './services/firestoreAppointments';

const handleStatusChange = async (appointmentId, newStatus) => {
  try {
    await updateAppointmentStatus(appointmentId, newStatus);
    alert('Status updated to: ' + newStatus);
    // Reload appointments
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## 🔐 Firestore Security Rules

Before deployment, set up security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /patients/{patientId} {
      allow read, write: if request.auth != null;
    }
    
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null;
    }
    
    match /medicalRecords/{recordId} {
      allow read, write: if request.auth != null;
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## ⚙️ Environment Setup

Make sure your `.env` file has Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=el3eyada-b0da3.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=el3eyada-b0da3
REACT_APP_FIREBASE_STORAGE_BUCKET=el3eyada-b0da3.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

---

## 📊 Firestore Console

Access your Firestore database:
https://console.firebase.google.com/project/el3eyada-b0da3/firestore

---

## 🐛 Error Handling

All functions include try-catch blocks and throw errors:

```javascript
try {
  const result = await addPatient(data);
  console.log('Success:', result);
} catch (error) {
  console.error('Error:', error.message);
  // Handle error
}
```

---

## 📈 Real-time Listeners (Advanced)

For real-time updates, use onSnapshot:

```javascript
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from './config/firebase';

useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, 'patients'),
    (snapshot) => {
      const patients = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPatients(patients);
    },
    (error) => console.error('Error:', error)
  );

  return () => unsubscribe(); // Cleanup
}, []);
```

---

## 🚀 Deployment

When deploying:
1. Update Firebase environment variables in hosting platform
2. Set security rules in Firebase Console
3. Test all CRUD operations
4. Monitor Firestore usage

---

## 📞 Troubleshooting

### Error: "Firebase is not initialized"
- Check firebase.js configuration
- Verify environment variables
- Restart development server

### Error: "Permission denied"
- Check Firestore security rules
- Ensure user is authenticated
- Verify authentication setup

### Slow queries?
- Add indexes in Firestore Console
- Limit data retrieval with pagination
- Use appropriate queries

---

## 🔗 Resources

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Query Data](https://firebase.google.com/docs/firestore/query-data/queries)

---

**Last Updated:** February 11, 2026
