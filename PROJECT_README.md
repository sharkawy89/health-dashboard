# MediFlow Dash - Medical Clinic Management System

A professional React-based dashboard for medical clinics to manage patients, appointments, and medical records.

## 🚀 Features

### ✅ Implemented
- **Dashboard Overview**: Real-time statistics, charts (Bar & Pie), and recent activity
- **Patient Management**: Complete CRUD operations with search and filtering
- **Appointment Scheduling**: Calendar-based booking system with status management
- **Responsive UI**: Beautiful Tailwind CSS design system
- **Mock Data**: Realistic test data for 20 patients and 50 appointments

### 🔜 Coming Soon
- Medical Records (EHR)
- Advanced Analytics
- Settings & Configuration

## 🛠 Tech Stack

- **Framework**: React.js (Create React App)
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Badge.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Header.jsx
│   ├── Input.jsx
│   ├── Layout.jsx
│   ├── Loading.jsx
│   ├── Modal.jsx
│   ├── Select.jsx
│   ├── Sidebar.jsx
│   ├── StatCard.jsx
│   └── Table.jsx
├── features/       # Feature-based logic (future)
├── hooks/          # Custom React hooks
│   ├── useAppointments.js
│   ├── useDashboard.js
│   └── usePatients.js
├── pages/          # Page components
│   ├── Analytics.jsx
│   ├── Appointments.jsx
│   ├── Dashboard.jsx
│   ├── MedicalRecords.jsx
│   ├── PatientForm.jsx
│   ├── PatientProfile.jsx
│   ├── Patients.jsx
│   └── Settings.jsx
├── services/       # API/Mock services
│   ├── appointmentService.js
│   ├── dashboardService.js
│   └── patientService.js
├── utils/          # Helper functions
│   ├── cn.js
│   ├── dateUtils.js
│   ├── formatters.js
│   └── validators.js
├── App.js          # Main app component
├── index.js        # Entry point
└── mockData.js     # Mock data
```

## 🎨 Design System

- **Primary Color**: Medical Blue (#2563eb)
- **Background**: Clean White & Light Gray (#f8fafc)
- **Feedback Colors**: 
  - Success: Green (#10b981)
  - Warning: Amber (#f59e0b)
  - Danger: Red (#ef4444)
- **Typography**: Inter font family

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to project directory:
```bash
cd "d:\my projects\react app\health-dashboard"
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📊 Mock Data

The application includes realistic mock data:
- **20 Patients**: Complete profiles with medical history
- **50 Appointments**: Spanning last 3 months to next month
- **Chart Data**: Daily visits and appointment distribution

Data includes Egyptian and international patients with chronic diseases like Diabetes and Hypertension.

## 🎯 Key Features

### Dashboard
- Total patients, appointments today, pending reports, and revenue stats
- Weekly patient visits bar chart
- Appointment types distribution pie chart
- Recent patients list

### Patient Management
- View all patients in a searchable table
- Add new patients with comprehensive forms
- Edit existing patient information
- View detailed patient profiles
- Track chronic diseases and medical history

### Appointments
- View all appointments with filtering (All, Upcoming, Past)
- Create new appointments
- Update appointment status (Pending → Confirmed → Completed)
- Cancel appointments
- View appointment details with patient information

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb', // Change primary color
      // ... other colors
    }
  }
}
```

### Mock Data
Edit `src/mockData.js` to add or modify patient and appointment data.

## 📝 License

Private project for clinic management.

## 👨‍💻 Developer Notes

- Uses React Query for efficient data fetching and caching
- All services simulate API delays for realistic UX
- Form validation included in utils/validators.js
- Date formatting utilities in utils/dateUtils.js
- Fully responsive design with Tailwind CSS

## 🐛 Known Issues

None currently. Please report any issues you encounter.

## 📧 Support

For questions or support, contact the development team.
