# Component Usage Guide

## 🧩 Reusable Components Reference

### Button
```jsx
import { Button } from './components/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// Variants: primary, secondary, success, danger, outline
// Sizes: sm, md, lg
```

### Card
```jsx
import { Card } from './components/Card';

<Card title="Card Title" actions={<Button>Action</Button>}>
  Card content goes here
</Card>
```

### Input
```jsx
import { Input } from './components/Input';

<Input 
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
/>
```

### Select
```jsx
import { Select } from './components/Select';

<Select
  label="Blood Type"
  value={bloodType}
  onChange={(e) => setBloodType(e.target.value)}
  options={[
    { value: 'A+', label: 'A+' },
    { value: 'B+', label: 'B+' }
  ]}
/>
```

### Table
```jsx
import { Table } from './components/Table';

const columns = [
  { header: 'Name', accessor: 'name' },
  { 
    header: 'Status', 
    render: (row) => <Badge>{row.status}</Badge>
  }
];

<Table 
  columns={columns} 
  data={patients}
  onRowClick={(row) => navigate(`/patients/${row.id}`)}
/>
```

### Badge
```jsx
import { Badge } from './components/Badge';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Cancelled</Badge>

// Variants: default, primary, success, warning, danger
```

### Loading
```jsx
import { Loading } from './components/Loading';

{isLoading && <Loading />}
```

### Modal
```jsx
import { Modal } from './components/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  Modal content
</Modal>
```

### StatCard
```jsx
import { StatCard } from './components/StatCard';
import { Users } from 'lucide-react';

<StatCard
  title="Total Patients"
  value={250}
  icon={Users}
  color="primary"
  trend="up"
  trendValue="+12%"
/>

// Colors: primary, success, warning, danger
```

---

## 🪝 Custom Hooks Usage

### Patient Hooks
```jsx
import { 
  usePatients, 
  usePatient, 
  useCreatePatient, 
  useUpdatePatient 
} from './hooks/usePatients';

// Get all patients
const { data: patients, isLoading } = usePatients();

// Get single patient
const { data: patient } = usePatient(patientId);

// Create patient
const createMutation = useCreatePatient();
createMutation.mutate(newPatientData);

// Update patient
const updateMutation = useUpdatePatient();
updateMutation.mutate({ id: patientId, data: updatedData });
```

### Appointment Hooks
```jsx
import { 
  useAppointments,
  useTodaysAppointments,
  useUpdateAppointmentStatus 
} from './hooks/useAppointments';

const { data: appointments } = useAppointments();
const { data: todaysAppts } = useTodaysAppointments();

const updateStatus = useUpdateAppointmentStatus();
updateStatus.mutate({ id: aptId, status: 'Confirmed' });
```

### Dashboard Hooks
```jsx
import { 
  useDashboardStats, 
  useChartData, 
  useRecentPatients 
} from './hooks/useDashboard';

const { data: stats } = useDashboardStats();
const { data: charts } = useChartData();
const { data: recent } = useRecentPatients();
```

---

## 🛠 Utility Functions

### Date Utilities
```jsx
import { 
  formatDate, 
  formatDateTime, 
  getRelativeTime 
} from './utils/dateUtils';

formatDate('2026-02-02'); // "Feb 02, 2026"
formatDateTime('2026-02-02', '14:30'); // "Feb 02, 2026 at 14:30"
getRelativeTime('2026-01-30'); // "3 days ago"
```

### Formatters
```jsx
import { 
  formatCurrency, 
  getInitials, 
  capitalize 
} from './utils/formatters';

formatCurrency(45250, 'EGP'); // "EGP 45,250.00"
getInitials('Ahmed Mohamed Hassan'); // "AH"
capitalize('pending'); // "Pending"
```

### Validators
```jsx
import { validateEmail, validatePhone, validateForm } from './utils/validators';

validateEmail('test@email.com'); // true
validatePhone('+20 100 123 4567'); // true

const { isValid, errors } = validateForm(data, {
  email: { required: true, email: true },
  phone: { required: true, phone: true }
});
```

### Class Names
```jsx
import { cn } from './utils/cn';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  'hover:bg-blue-500'
)}>
  Content
</div>
```

---

## 📊 Mock Data Structure

### Patient Object
```javascript
{
  id: 1,
  fullName: "Ahmed Mohamed Hassan",
  gender: "Male",
  dob: "1985-03-15",
  phone: "+20 100 123 4567",
  email: "ahmed.hassan@email.com",
  address: "15 El Tahrir St, Cairo, Egypt",
  bloodType: "A+",
  lastVisit: "2025-12-20",
  chronicDiseases: ["Diabetes"]
}
```

### Appointment Object
```javascript
{
  id: 1,
  patientId: 4,
  doctorName: "Dr. Ahmed El-Shazly",
  date: "2026-02-05",
  time: "09:00",
  type: "Consultation", // Consultation, Follow-up, Emergency, Surgery
  status: "Confirmed" // Confirmed, Pending, Cancelled, Completed
}
```

---

## 🎨 Tailwind Custom Classes

### Buttons
```jsx
.btn-primary   // Primary button style
.btn-secondary // Secondary button style
```

### Components
```jsx
.card         // Card container style
.input-field  // Input field style
```

---

## 🔄 React Query Configuration

```javascript
// In App.js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px   // Small devices
md: 768px   // Medium devices
lg: 1024px  // Large devices
xl: 1280px  // Extra large devices
```

Usage:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  // Responsive grid
</div>
```

---

## 🎯 Common Patterns

### Page Template
```jsx
import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { useCustomHook } from '../hooks/useCustomHook';

const MyPage = () => {
  const { data, isLoading } = useCustomHook();
  
  if (isLoading) return <Loading />;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Page Title</h1>
        <p className="text-slate-600 mt-1">Description</p>
      </div>
      
      <Card title="Card Title">
        Content
      </Card>
    </div>
  );
};

export default MyPage;
```

### Form Template
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission
};

return (
  <form onSubmit={handleSubmit}>
    <Input
      label="Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
    />
    <Button type="submit">Submit</Button>
  </form>
);
```

---

## 📚 Quick Tips

1. **Always use the `cn()` utility** for conditional classes
2. **Import icons from lucide-react** for consistent icons
3. **Use React Query hooks** for data fetching
4. **Add loading states** for better UX
5. **Use Badge component** for status indicators
6. **Keep components in separate files** for reusability
7. **Use the Layout component** for consistent page structure
8. **Follow the established color system** for consistency

---

*This guide covers all the components and utilities available in EL kabsola*
