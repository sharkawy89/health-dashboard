import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Activity, Edit } from 'lucide-react';
import { usePatient } from '../hooks/usePatients';
import { usePatientAppointments } from '../hooks/useAppointments';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Loading } from '../components/Loading';
import { formatDate, formatDateTime } from '../utils/dateUtils';

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: patient, isLoading: patientLoading } = usePatient(id);
  const { data: appointments, isLoading: appointmentsLoading } = usePatientAppointments(id);
  
  if (patientLoading || appointmentsLoading) return <Loading />;
  if (!patient) return <div>Patient not found</div>;
  
  const getStatusBadge = (status) => {
    const variants = {
      'Completed': 'success',
      'Confirmed': 'primary',
      'Pending': 'warning',
      'Cancelled': 'danger',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => navigate('/patients')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">Patient Profile</h1>
          <p className="text-slate-600 mt-1">View and manage patient information</p>
        </div>
        <Button onClick={() => navigate(`/patients/${id}/edit`)}>
          <Edit className="h-5 w-5 mr-2" />
          Edit Profile
        </Button>
      </div>
      
      {/* Patient Info Card */}
      <Card>
        <div className="flex items-start gap-6">
          <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary font-bold text-3xl">
              {patient.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900">{patient.fullName}</h2>
            <p className="text-slate-600 mt-1">Patient ID: #{patient.id}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">{patient.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <p className="font-medium text-slate-900">{patient.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="font-medium text-slate-900">{patient.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Date of Birth</p>
                  <p className="font-medium text-slate-900">{formatDate(patient.dob)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Medical Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Blood Type">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary">{patient.bloodType}</p>
          </div>
        </Card>
        
        <Card title="Gender">
          <div className="text-center">
            <p className="text-2xl font-semibold text-slate-900">{patient.gender}</p>
          </div>
        </Card>
        
        <Card title="Last Visit">
          <div className="text-center">
            <p className="text-lg font-medium text-slate-900">{formatDate(patient.lastVisit)}</p>
          </div>
        </Card>
      </div>
      
      {/* Chronic Diseases */}
      <Card title="Chronic Diseases">
        <div className="flex gap-2 flex-wrap">
          {patient.chronicDiseases.length > 0 ? (
            patient.chronicDiseases.map((disease, index) => (
              <Badge key={index} variant="warning" className="text-base px-4 py-2">
                <Activity className="h-4 w-4 mr-2 inline" />
                {disease}
              </Badge>
            ))
          ) : (
            <p className="text-slate-600">No chronic diseases recorded</p>
          )}
        </div>
      </Card>
      
      {/* Appointment History */}
      <Card title="Appointment History">
        <div className="space-y-3">
          {appointments && appointments.length > 0 ? (
            appointments.slice(0, 10).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900">{appointment.type}</p>
                  <p className="text-sm text-slate-500">
                    {formatDateTime(appointment.date, appointment.time)} - {appointment.doctorName}
                  </p>
                </div>
                {getStatusBadge(appointment.status)}
              </div>
            ))
          ) : (
            <p className="text-slate-600 text-center py-4">No appointments found</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PatientProfile;
