import axios from 'axios';

// Configure API base URL via Vite env or fallback
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:8080';

// Axios instance with Authorization support
const http = axios.create({ baseURL: API_BASE_URL });

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config || {};
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('Missing refresh token');
        const r = await http.post('/api/v1/auth/refresh', { refreshToken });
        const newAccess = r?.data?.token || r?.data?.accessToken;
        const newRefresh = r?.data?.refreshToken;
        if (!newAccess) throw new Error('No token in refresh response');
        localStorage.setItem('accessToken', newAccess);
        if (newRefresh) localStorage.setItem('refreshToken', newRefresh);
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return http(originalRequest);
      } catch (refreshErr) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

// Helper to extract token from common response shapes
const extractToken = (resData) => {
  if (!resData) return undefined;
  return (
    resData.token ||
    resData.accessToken ||
    resData.jwt ||
    (resData.data && (resData.data.token || resData.data.accessToken))
  );
};

const api = {
  async login(email, password, userType = 'ADMIN') {
    const res = await http.post('/api/v1/auth/login', { email, password, userType });
    const token = res?.data?.token || extractToken(res.data);
    const refreshToken = res?.data?.refreshToken;
    return { data: { token, refreshToken } };
  },

  async registerAdmin(payload) {
    const res = await http.post('/api/v1/auth/register/admin', payload);
    return res.data;
  },
  async logout() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await http.post('/api/v1/auth/logout', { refreshToken });
    } catch {
      // ignore backend logout failures, proceed with client cleanup
    }
  },
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await http.post('/api/v1/auth/refresh', { refreshToken });
    const token = res?.data?.token || extractToken(res.data);
    const newRefresh = res?.data?.refreshToken;
    return { data: { token, refreshToken: newRefresh } };
  },
  searchFlights: async (params) => {
    const res = await http.get('/api/v1/flights/search', { params });
    return { data: res.data };
  },
  getFlightDetails: async (id) => {
    const res = await http.get(`/api/v1/flights/${id}`);
    return { data: res.data };
  },
  getFareRules: async (fareId) => {
    const res = await http.get(`/api/v1/flights/fares/${fareId}/rules`);
    return { data: res.data };
  },
  createBooking: async (payload) => {
    const res = await http.post('/api/v1/bookings', payload);
    return res.data;
  },
  getBooking: async (id) => {
    const res = await http.get(`/api/v1/bookings/${id}`);
    return { data: res.data };
  },
  searchBookings: async (params) => {
    const res = await http.get('/api/v1/bookings', { params });
    return { data: res.data };
  },
  cancelBooking: async (id) => {
    const res = await http.post(`/api/v1/bookings/${id}/cancel`);
    return res.data;
  },
  reconfirmBooking: async (id) => {
    const res = await http.post(`/api/v1/bookings/${id}/reconfirm`);
    return res.data;
  },
  issueTicket: async (payload) => {
    const res = await http.post('/api/v1/tickets/issue', payload);
    return res.data;
  },
  getTicket: async (id) => {
    const res = await http.get(`/api/v1/tickets/${id}`);
    return { data: res.data };
  },
  searchTickets: async (params) => {
    const res = await http.get('/api/v1/tickets', { params });
    return { data: res.data };
  },
  voidTicket: async (id) => {
    const res = await http.post(`/api/v1/tickets/${id}/void`);
    return res.data;
  },
  refundTicket: async (id) => {
    const res = await http.post(`/api/v1/tickets/${id}/refund`);
    return res.data;
  },
  getAgentProfile: async () => {
    const res = await http.get('/api/v1/agents/profile');
    return { data: res.data };
  },
  updateAgent: async (payload) => {
    const res = await http.put('/api/v1/agents/profile', payload);
    return res.data;
  },
  getAgentStatistics: async () => {
    const res = await http.get('/api/v1/agents/statistics');
    return { data: res.data };
  },

  // Agent-side user management (Agent can manage their own users)
  getAgentUsers: async () => {
    const res = await http.get('/api/v1/agents/users');
    return { data: res.data };
  },
  createAgentUser: async (payload) => {
    const res = await http.post('/api/v1/agents/users', payload);
    return res.data;
  },

  // Admin-side agent management
  getAgents: async () => {
    const res = await http.get('/api/v1/admin/agents');
    return { data: res.data };
  },
  createAgent: async (payload) => {
    const res = await http.post('/api/v1/admin/agents', payload);
    return res.data;
  },
  updateAgentAdmin: async (id, payload) => {
    const res = await http.put(`/api/v1/admin/agents/${id}`, payload);
    return res.data;
  },
  deleteAgent: async (id) => {
    const res = await http.delete(`/api/v1/admin/agents/${id}`);
    return res.data;
  },
  getCreditBalance: async () => {
    const res = await http.get('/api/v1/credit/balance');
    return { data: res.data };
  },
  getCreditTransactions: async () => {
    const res = await http.get('/api/v1/credit/transactions');
    return { data: res.data };
  },
  topupCredit: async (payload) => {
    const res = await http.post('/api/v1/credit/topup', payload);
    return res.data;
  },
  getCreditHistory: async () => {
    const res = await http.get('/api/v1/credit/topups');
    return { data: res.data };
  },
  approveCreditTopup: async (id) => {
    const res = await http.post(`/api/v1/admin/credit-topups/${id}/approve`);
    return res.data;
  },
  rejectCreditTopup: async (id) => {
    const res = await http.post(`/api/v1/admin/credit-topups/${id}/reject`);
    return res.data;
  },
  getAdminDashboard: async () => {
    const res = await http.get('/api/v1/admin/dashboard');
    return { data: res.data };
  },
  getAdminLogs: async () => {
    const res = await http.get('/api/v1/admin/audit-logs');
    return { data: res.data };
  },
  getSyncLogs: async () => {
    const res = await http.get('/api/v1/admin/sync-logs');
    return { data: res.data };
  },
  triggerSync: async () => {
    const res = await http.post('/api/v1/admin/sync/trigger');
    return res.data;
  },
  updateSystemSetting: async (key, payload) => {
    const res = await http.put(`/api/v1/admin/settings/${encodeURIComponent(key)}`, payload);
    return res.data;
  },
  getEmployees: async () => {
    const res = await http.get('/api/v1/employees');
    return { data: res.data };
  },
  createEmployee: async (payload) => {
    const res = await http.post('/api/v1/employees', payload);
    return res.data;
  },
  updateEmployee: async (id, payload) => {
    const res = await http.put(`/api/v1/employees/${id}`, payload);
    return res.data;
  },
  deleteEmployee: async (id) => {
    const res = await http.delete(`/api/v1/employees/${id}`);
    return res.data;
  },
  deactivateEmployee: async (id) => {
    const res = await http.post(`/api/v1/employees/${id}/deactivate`);
    return res.data;
  },
  resetEmployeePassword: async (id, payload) => {
    const res = await http.post(`/api/v1/employees/${id}/reset-password`, payload || {});
    return res.data;
  },
};

export { api };