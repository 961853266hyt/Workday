import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import HRVisaStatusPage from './HRVisaStatusPage';
import EmployeeVisaStatusPage from './EmployeeVisaStatusPage';

const VisaStatusManagement: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.user.user?.role);

  if (!userRole) {
    return <div>please login first</div>;
  }

  return (
    <div>
      {userRole === 'HR' ? <HRVisaStatusPage /> : <EmployeeVisaStatusPage />}
    </div>
  );
};

export default VisaStatusManagement;