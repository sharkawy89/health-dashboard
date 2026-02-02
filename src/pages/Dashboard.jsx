import React from 'react';
import { Users, Calendar, FileText, DollarSign } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { Loading } from '../components/Loading';
import { Badge } from '../components/Badge';
import { useDashboardStats, useChartData, useRecentPatients } from '../hooks/useDashboard';
import { formatDate } from '../utils/dateUtils';

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: chartData, isLoading: chartLoading } = useChartData();
  const { data: recentPatients, isLoading: patientsLoading } = useRecentPatients();
  
  if (statsLoading || chartLoading || patientsLoading) {
    return <Loading />;
  }
  
  const COLORS = ['#2563eb', '#10b981', '#ef4444', '#f59e0b'];
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back, Dr. Ahmed Hassan</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={stats.totalPatients}
          icon={Users}
          color="primary"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Appointments Today"
          value={stats.appointmentsToday}
          icon={Calendar}
          color="success"
        />
        <StatCard
          title="Pending Reports"
          value={stats.pendingReports}
          icon={FileText}
          color="warning"
        />
        <StatCard
          title="Monthly Revenue"
          value={`${stats.revenue.toLocaleString()} EGP`}
          icon={DollarSign}
          color="primary"
          trend="up"
          trendValue="+8%"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Visits Chart */}
        <Card title="Daily Visits (Last 7 Days)">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.dailyVisits.labels.map((label, index) => ({
              name: label,
              visits: chartData.dailyVisits.datasets[0].data[index]
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="visits" fill="#2563eb" name="Daily Visits" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        
        {/* Appointment Types Chart */}
        <Card title="Appointment Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.appointmentDistribution.labels.map((label, index) => ({
                  name: label,
                  value: chartData.appointmentDistribution.datasets[0].data[index]
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.appointmentDistribution.labels.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      {/* Recent Patients */}
      <Card title="Recent Patients" actions={
        <a href="/patients" className="text-primary hover:text-primary-700 text-sm font-medium">
          View All
        </a>
      }>
        <div className="space-y-4">
          {recentPatients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {patient.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-900">{patient.fullName}</p>
                  <p className="text-sm text-slate-500">{patient.email}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant={patient.chronicDiseases.length > 0 ? 'warning' : 'success'}>
                  {patient.chronicDiseases.length > 0 ? patient.chronicDiseases[0] : 'Healthy'}
                </Badge>
                <p className="text-sm text-slate-500 mt-1">
                  Last visit: {formatDate(patient.lastVisit)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
