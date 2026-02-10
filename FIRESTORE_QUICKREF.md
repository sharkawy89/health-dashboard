# 🚀 Firestore Quick Reference

Quick copy-paste examples for common operations.

---

## ✨ Add Operations

### Add Patient
```javascript
import { addPatient } from './services/firestorePatients';

const id = await addPatient({
  fullName: 'John Doe',
  gender: 'Male',
  dob: '1990-01-15',
  phone: '+1234567890',
  email: 'john@example.com',
  address: '123 Main St',
  bloodType: 'O+',
  chronicDiseases: ['Diabetes']
});
```

### Add Appointment
```javascript
import { addAppointment } from './services/firestoreAppointments';

const id = await addAppointment({
  patientId: 'patient-123',
  doctorName: 'Dr. Ahmed Hassan',
  date: new Date('2026-02-15'),
  time: '10:00 AM',
  type: 'Consultation',
  status: 'Pending',
  notes: 'Regular checkup'
});
```

### Add Medical Record
```javascript
import { addMedicalRecord } from './services/firestoreMedicalRecords';

const id = await addMedicalRecord({
  patientId: 'patient-123',
  type: 'Diagnosis',
  title: 'Hypertension',
  description: 'Stage 2 hypertension diagnosed',
  doctorName: 'Dr. John Smith',
  notes: 'Prescribed medication'
});
```

### Add User
```javascript
import { addUser } from './services/firestoreUsers';

const id = await addUser({
  name: 'Dr. Ahmed Hassan',
  email: 'ahmed@clinic.com',
  role: 'Doctor',
  department: 'General Medicine',
  phone: '+1234567890'
});
```

---

## 📖 Get Operations

### Get Single Patient
```javascript
import { getPatientById } from './services/firestorePatients';

const patient = await getPatientById('patient-123');
console.log(patient.fullName);
```

### Get All Patients
```javascript
import { getAllPatients } from './services/firestorePatients';

const patients = await getAllPatients();
patients.forEach(p => console.log(p.fullName));
```

### Search Patients
```javascript
import { searchPatients } from './services/firestorePatients';

const results = await searchPatients('john');
// Returns patients with name/email/phone containing 'john'
```

### Get Patient's Appointments
```javascript
import { getPatientAppointments } from './services/firestoreAppointments';

const appointments = await getPatientAppointments('patient-123');
```

### Get Today's Appointments
```javascript
import { getTodayAppointments } from './services/firestoreAppointments';

const today = await getTodayAppointments();
```

### Get Patient's Medical Records
```javascript
import { getPatientMedicalRecords } from './services/firestoreMedicalRecords';

const records = await getPatientMedicalRecords('patient-123');
```

### Get Users by Role
```javascript
import { getUsersByRole } from './services/firestoreUsers';

const doctors = await getUsersByRole('Doctor');
const nurses = await getUsersByRole('Nurse');
```

---

## ✏️ Update Operations

### Update Patient
```javascript
import { updatePatient } from './services/firestorePatients';

await updatePatient('patient-123', {
  phone: '+9876543210',
  address: 'New Address'
});
```

### Update Appointment Status
```javascript
import { updateAppointmentStatus } from './services/firestoreAppointments';

// Change to Confirmed
await updateAppointmentStatus('apt-123', 'Confirmed');

// Or: Pending, Completed, Cancelled
```

### Update Appointment
```javascript
import { updateAppointment } from './services/firestoreAppointments';

await updateAppointment('apt-123', {
  time: '2:00 PM',
  notes: 'Updated notes'
});
```

### Update Medical Record
```javascript
import { updateMedicalRecord } from './services/firestoreMedicalRecords';

await updateMedicalRecord('record-123', {
  description: 'Updated description',
  notes: 'New notes'
});
```

### Deactivate User
```javascript
import { deactivateUser } from './services/firestoreUsers';

await deactivateUser('user-123');
```

### Activate User
```javascript
import { activateUser } from './services/firestoreUsers';

await activateUser('user-123');
```

---

## 🗑️ Delete Operations

### Delete Patient
```javascript
import { deletePatient } from './services/firestorePatients';

await deletePatient('patient-123');
```

### Delete Appointment
```javascript
import { deleteAppointment } from './services/firestoreAppointments';

await deleteAppointment('apt-123');
```

### Delete Medical Record
```javascript
import { deleteMedicalRecord } from './services/firestoreMedicalRecords';

await deleteMedicalRecord('record-123');
```

### Delete User
```javascript
import { deleteUser } from './services/firestoreUsers';

await deleteUser('user-123');
```

---

## 🎣 Hook Examples

### Load Patients in Component
```javascript
import { usePatientFirestore } from './hooks/usePatientFirestore';

function Component() {
  const { patients, loading, error, loadPatients } = usePatientFirestore();

  useEffect(() => {
    loadPatients();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {patients.map(p => <li key={p.id}>{p.fullName}</li>)}
    </ul>
  );
}
```

### Create Patient in Form
```javascript
import { usePatientFirestore } from './hooks/usePatientFirestore';

function AddPatientForm() {
  const { create, loading, error } = usePatientFirestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await create({
        fullName: formData.fullName,
        email: formData.email,
        // ... other fields
      });
      alert('Patient created!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={loading}>
        {loading ? 'Creating...' : 'Create Patient'}
      </button>
    </form>
  );
}
```

### Edit Appointment Status
```javascript
import { useAppointmentFirestore } from './hooks/useAppointmentFirestore';

function AptStatusDropdown({ appointmentId }) {
  const { updateStatus, loading } = useAppointmentFirestore();

  const handleStatusChange = async (newStatus) => {
    await updateStatus(appointmentId, newStatus);
  };

  return (
    <select onChange={e => handleStatusChange(e.target.value)} disabled={loading}>
      <option value="Pending">Pending</option>
      <option value="Confirmed">Confirmed</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
}
```

---

## 🔍 Filter Examples

### Get Patients with Specific Disease
```javascript
import { getPatientsByDisease } from './services/firestorePatients';

const diabetics = await getPatientsByDisease('Diabetes');
```

### Get Patients by Blood Type
```javascript
import { getPatientsByBloodType } from './services/firestorePatients';

const oPositive = await getPatientsByBloodType('O+');
```

### Get Appointments by Status
```javascript
import { getAppointmentsByStatus } from './services/firestoreAppointments';

const pending = await getAppointmentsByStatus('Pending');
const confirmed = await getAppointmentsByStatus('Confirmed');
```

### Get Medical Records by Type
```javascript
import { getMedicalRecordsByType } from './services/firestoreMedicalRecords';

const diagnoses = await getMedicalRecordsByType('patient-123', 'Diagnosis');
const prescriptions = await getMedicalRecordsByType('patient-123', 'Prescription');
```

### Get Active Users
```javascript
import { getActiveUsers } from './services/firestoreUsers';

const active = await getActiveUsers();
```

### Search Users
```javascript
import { searchUsers } from './services/firestoreUsers';

const found = await searchUsers('ahmed');
```

---

## ⚠️ Error Handling

```javascript
try {
  const patient = await addPatient(data);
  console.log('Success:', patient);
} catch (error) {
  if (error.code === 'permission-denied') {
    console.error('No permission');
  } else if (error.code === 'invalid-argument') {
    console.error('Invalid data');
  } else {
    console.error('Error:', error.message);
  }
}
```

---

## 📝 Form Integration Example

```javascript
import { usePatientFirestore } from './hooks/usePatientFirestore';
import { useState } from 'react';

export function PatientForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    bloodType: '',
    address: '',
    chronicDiseases: []
  });

  const { create, loading, error } = usePatientFirestore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = await create(formData);
      alert('Patient created with ID: ' + id);
      setFormData({
        fullName: '', email: '', phone: '', gender: '',
        dob: '', bloodType: '', address: '', chronicDiseases: []
      });
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      {/* More fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Patient'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
}
```

---

## 🔗 All Available Functions

**Patients:**
- addPatient, getAllPatients, getPatientById, searchPatients, updatePatient, deletePatient, getPatientsByDisease, getPatientsByBloodType

**Appointments:**
- addAppointment, getAllAppointments, getAppointmentById, getPatientAppointments, getAppointmentsByStatus, updateAppointment, updateAppointmentStatus, deleteAppointment, getTodayAppointments

**Medical Records:**
- addMedicalRecord, getAllMedicalRecords, getPatientMedicalRecords, getMedicalRecordById, updateMedicalRecord, deleteMedicalRecord, searchMedicalRecords, getMedicalRecordsByType

**Users:**
- addUser, getAllUsers, getUserById, getUsersByRole, getActiveUsers, updateUser, deactivateUser, activateUser, deleteUser, getUserByEmail, searchUsers

---

**Save this file for quick reference!**
