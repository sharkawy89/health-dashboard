import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { usePatient, useCreatePatient, useUpdatePatient } from '../hooks/usePatients';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Loading } from '../components/Loading';

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const { data: patient, isLoading } = usePatient(id);
  const createMutation = useCreatePatient();
  const updateMutation = useUpdatePatient();
  
  const [formData, setFormData] = useState(patient || {
    fullName: '',
    gender: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    bloodType: '',
    chronicDiseases: [],
  });
  
  React.useEffect(() => {
    if (patient) {
      setFormData(patient);
    }
  }, [patient]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        await updateMutation.mutateAsync({ id, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      navigate('/patients');
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };
  
  if (isLoading && isEditMode) return <Loading />;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button variant="secondary" onClick={() => navigate('/patients')} className="w-fit">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {isEditMode ? 'Edit Patient' : 'Add New Patient'}
          </h1>
          <p className="text-slate-600 mt-1">
            {isEditMode ? 'Update patient information' : 'Create a new patient record'}
          </p>
        </div>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Card>
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <Select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={[
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                  ]}
                  required
                />
                <Input
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
                <Select
                  label="Blood Type"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  options={[
                    { value: 'A+', label: 'A+' },
                    { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' },
                    { value: 'B-', label: 'B-' },
                    { value: 'AB+', label: 'AB+' },
                    { value: 'AB-', label: 'AB-' },
                    { value: 'O+', label: 'O+' },
                    { value: 'O-', label: 'O-' },
                  ]}
                  required
                />
              </div>
            </div>
            
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/patients')}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                <Save className="h-5 w-5 mr-2" />
                {isEditMode ? 'Update Patient' : 'Create Patient'}
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default PatientForm;
