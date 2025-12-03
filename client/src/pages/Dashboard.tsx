import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to your dashboard.</p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
