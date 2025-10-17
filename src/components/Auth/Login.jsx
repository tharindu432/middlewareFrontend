import { useState } from 'react';
import { motion } from 'framer-motion';
import {useAuth} from './AuthContext';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState('ADMIN');
    const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
      setError('');

      try {
        await login(credentials.email, credentials.password, role);
        navigate('/'); // Redirect to dashboard on successful login
    } catch (error) {
      console.error('Login failed:', error);
        const errorMessage = error?.response?.data?.message ||
            error?.message ||
            'Login failed. Please check your credentials and selected role.';
        setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="card p-8 w-full max-w-md shadow-xl"
        >
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

          {/* Error Message */}
          {error && (
              <motion.div
                  initial={{opacity: 0, scale: 0.95}}
                  animate={{opacity: 1, scale: 1}}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
              >
                  <p className="text-sm text-red-600">{error}</p>
              </motion.div>
          )}

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
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            >
                <option value="ADMIN">Administrator</option>
                <option value="AGENT_MANAGER">Agent Manager</option>
                <option value="AGENT_USER">Agent User</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                    disabled={isLoading}
                />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
              <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer disabled:opacity-50"
                  disabled={isLoading}
              >
              Forgot password?
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary w-full shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
              {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Signing in...
                  </div>
              ) : (
                  'Sign In'
              )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Admin setup? <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">Register Admin</a>
        </p>

            {/* Role Information */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Role Access Levels:</h4>
                <div className="space-y-1 text-xs text-gray-600">
                    <div><strong>Administrator:</strong> Full system access</div>
                    <div><strong>Agent Manager:</strong> Team management + bookings</div>
                    <div><strong>Agent User:</strong> Bookings and tickets only</div>
                    <div><strong>Employee:</strong> Basic booking operations</div>
                </div>
            </div>
      </motion.div>
    </div>
  );
};

export default Login;