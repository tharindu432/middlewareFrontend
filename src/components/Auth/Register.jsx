import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

const Register = () => {
  // Admin registration only, per requirement
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'ADMIN' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.registerAdmin(formData);
      alert('Admin registered. Please login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error?.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <form onSubmit={handleSubmit} className="card p-8 w-full max-w-md animate-fade-in shadow-xl">
        <h2 className="text-2xl font-bold mb-1 text-gray-900">Create Admin Account</h2>
        <p className="text-sm text-gray-600 mb-4">Create the first administrator account for your system.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="input-field"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="input-field"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="input-field bg-gray-50"
          >
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
        <p className="text-center text-sm text-gray-600 mt-4">Already have an account? <a href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</a></p>
      </form>
    </div>
  );
};

export default Register;