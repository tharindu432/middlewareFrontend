import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('ADMIN');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resp = await api.login(credentials.email, credentials.password, role);
      const token = resp?.data?.token;
      const refresh = resp?.data?.refreshToken;
      if (!token) throw new Error('No token returned');
      localStorage.setItem('accessToken', token);
      if (refresh) localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('role', role);
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
      alert(error?.response?.data?.message || 'Login failed. Check credentials and selected role.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="card p-8 w-full max-w-md shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">F</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field"
            >
              <option value="ADMIN">Admin</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="AGENT">Agent</option>
            </select>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-blue-600 cursor-pointer" />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <button type="button" className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary w-full shadow-lg hover:shadow-xl"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>



        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Admin setup? <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">Register Admin</a>
        </p>
      </div>
    </div>
  );
};

export default Login;