import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter } from 'lucide-react';
import { usePatients } from '../hooks/usePatients';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Loading } from '../components/Loading';
import { formatDate } from '../utils/dateUtils';

const Patients = () => {
  const navigate = useNavigate();
  const { data: patients, isLoading } = usePatients();
  const [searchQuery, setSearchQuery] = useState('');
  
  if (isLoading) return <Loading />;
  
  const filteredPatients = patients.filter(patient =>
    patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery) ||
    patient.id.toString().includes(searchQuery)
  );
  
  const columns = [
    {
      header: 'Patient ID',
      accessor: 'id',
      render: (row) => <span className="font-medium">#{row.id}</span>
    },
    {
      header: 'Full Name',
      accessor: 'fullName',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-primary font-semibold text-sm">
              {row.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="font-medium text-slate-900">{row.fullName}</p>
            <p className="text-sm text-slate-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Gender',
      accessor: 'gender',
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Blood Type',
      accessor: 'bloodType',
      render: (row) => <Badge variant="primary">{row.bloodType}</Badge>
    },
    {
      header: 'Chronic Diseases',
      accessor: 'chronicDiseases',
      render: (row) => (
        <div className="flex gap-1 flex-wrap">
          {row.chronicDiseases.length > 0 ? (
            row.chronicDiseases.map((disease, index) => (
              <Badge key={index} variant="warning">{disease}</Badge>
            ))
          ) : (
            <Badge variant="success">None</Badge>
          )}
        </div>
      )
    },
    {
      header: 'Last Visit',
      accessor: 'lastVisit',
      render: (row) => formatDate(row.lastVisit)
    },
  ];
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Patients</h1>
          <p className="text-slate-600 mt-1">Manage all patient records</p>
        </div>
        <Button onClick={() => navigate('/patients/new')}>
          <Plus className="h-5 w-5 mr-2" />
          Add Patient
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <Button variant="secondary">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
        </div>
      </Card>
      
      {/* Patient Table */}
      <Card>
        <Table
          columns={columns}
          data={filteredPatients}
          onRowClick={(patient) => navigate(`/patients/${patient.id}`)}
        />
      </Card>
      
      {/* Summary */}
      <div className="text-sm text-slate-600">
        Showing {filteredPatients.length} of {patients.length} patients
      </div>
    </div>
  );
};

export default Patients;
