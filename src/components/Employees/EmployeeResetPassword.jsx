import { useState } from 'react';
import { api } from '../../services/api';

const EmployeeResetPassword = () => {
  const [employeeId, setEmployeeId] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await api.resetEmployeePassword(employeeId);
      alert('Password reset successfully!');
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Reset Employee Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="text"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Reset</button>
      </form>
    </div>
  );
};

export default EmployeeResetPassword;