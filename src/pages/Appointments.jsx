import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock } from 'lucide-react';
import { useAppointments, useUpdateAppointmentStatus } from '../hooks/useAppointments';
import { usePatients } from '../hooks/usePatients';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Loading } from '../components/Loading';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { formatDate } from '../utils/dateUtils';

const Appointments = () => {
  const { data: appointments, isLoading } = useAppointments();
  const { data: patients } = usePatients();
  const updateStatusMutation = useUpdateAppointmentStatus();
  
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  if (isLoading) return <Loading />;
  
  const getStatusBadge = (status) => {
    const variants = {
      'Completed': 'success',
      'Confirmed': 'primary',
      'Pending': 'warning',
      'Cancelled': 'danger',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };
  
  const getTypeBadge = (type) => {
    const variants = {
      'Consultation': 'primary',
      'Follow-up': 'success',
      'Emergency': 'danger',
      'Surgery': 'warning',
    };
    return <Badge variant={variants[type] || 'default'}>{type}</Badge>;
  };
  
  const getPatientName = (patientId) => {
    const patient = patients?.find(p => p.id === patientId);
    return patient ? patient.fullName : 'Unknown Patient';
  };
  
  const filteredAppointments = appointments.filter(apt => {
    const today = new Date();
    const aptDate = new Date(apt.date);
    
    if (filter === 'upcoming') {
      return aptDate >= today;
    } else if (filter === 'past') {
      return aptDate < today;
    }
    return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id: appointmentId, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-600 mt-1">Manage patient appointments</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-5 w-5 mr-2" />
          New Appointment
        </Button>
      </div>
      
      {/* Filter Tabs */}
      <Card>
        <div className="flex gap-4">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onClick={() => setFilter('all')}
          >
            All Appointments
          </Button>
          <Button
            variant={filter === 'upcoming' ? 'primary' : 'secondary'}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </Button>
          <Button
            variant={filter === 'past' ? 'primary' : 'secondary'}
            onClick={() => setFilter('past')}
          >
            Past
          </Button>
        </div>
      </Card>
      
      {/* Appointments Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="h-6 w-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {getPatientName(appointment.patientId)}
                    </h3>
                    {getTypeBadge(appointment.type)}
                    {getStatusBadge(appointment.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div>
                      <span className="font-medium">Dr.</span> {appointment.doctorName.replace('Dr. ', '')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                {appointment.status === 'Pending' && (
                  <>
                    <Button 
                      size="sm" 
                      variant="success"
                      onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                    >
                      Confirm
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {appointment.status === 'Confirmed' && (
                  <Button 
                    size="sm" 
                    variant="success"
                    onClick={() => handleStatusChange(appointment.id, 'Completed')}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredAppointments.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <CalendarIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">No appointments found</p>
          </div>
        </Card>
      )}
      
      {/* New Appointment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Appointment"
        className="sm:max-w-2xl"
      >
        <form className="space-y-4">
          <Select
            label="Patient"
            options={patients?.map(p => ({ value: p.id, label: p.fullName })) || []}
          />
          <Select
            label="Appointment Type"
            options={[
              { value: 'Consultation', label: 'Consultation' },
              { value: 'Follow-up', label: 'Follow-up' },
              { value: 'Emergency', label: 'Emergency' },
              { value: 'Surgery', label: 'Surgery' },
            ]}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Date" type="date" />
            <Input label="Time" type="time" />
          </div>
          <Input label="Doctor Name" placeholder="Dr. Ahmed Hassan" />
          
          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Create Appointment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Appointments;
