import { useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../Common/Toast';

const EmployeeDeactivate = () => {
  const toast = useToast();
  const [employeeId, setEmployeeId] = useState('');

  const handleDeactivate = async (e) => {
    e.preventDefault();
    try {
      await api.deactivateEmployee(employeeId);
      toast.success('Employee deactivated');
      setEmployeeId('');
    } catch (error) {
      const msg = error?.response?.data?.message || 'Employee deactivation failed';
      toast.error(msg);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Deactivate Employee</h2>
      <form onSubmit={handleDeactivate} className="space-y-4">
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Deactivate</button>
      </form>
    </div>
  );
};

export default EmployeeDeactivate;