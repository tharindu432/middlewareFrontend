import { useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../Common/Toast';

const EmployeeForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'EMPLOYEE' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createEmployee(formData);
      toast.success('Employee created successfully');
      setFormData({ firstName: '', lastName: '', email: '', password: '', role: 'EMPLOYEE' });
    } catch (error) {
      const msg = error?.response?.data?.message || 'Employee creation failed';
      toast.error(msg);
    }
  };

  return (
    <div className="card mb-6 p-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Add Employee</h2>
        <p className="text-sm text-gray-600">Create a new employee account with a temporary password.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="input-field"
              autoComplete="given-name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="input-field"
              autoComplete="family-name"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-field"
            autoComplete="email"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Temporary Password</label>
            <input
              type="password"
              placeholder="Enter a secure temporary password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input-field"
              autoComplete="new-password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="input-field"
            >
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="MANAGER">MANAGER</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button type="submit" className="btn btn-primary shadow-md">Create Employee</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
