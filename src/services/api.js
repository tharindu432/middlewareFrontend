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

const dummyData = {
  login: { data: { token: 'dummy-token-123' } },
  flights: Array(5).fill().map((_, i) => ({
    id: `flight-${i + 1}`,
    origin: `City${i + 1}`,
    destination: `City${i + 2}`,
    price: (100 + i * 50).toFixed(2),
    date: '2025-10-15',
  })),
  bookings: Array(5).fill().map((_, i) => ({
    id: `booking-${i + 1}`,
    contactEmail: `user${i + 1}@example.com`,
    route: `City${i + 1} to City${i + 2}`,
    date: '2025-10-14',
    amount: (200 + i * 30).toFixed(2),
    status: i % 2 === 0 ? 'Pending' : 'Confirmed',
  })),
  tickets: Array(5).fill().map((_, i) => ({
    id: `ticket-${i + 1}`,
    bookingId: `booking-${i + 1}`,
    passengerName: `Passenger ${i + 1}`,
    status: i % 2 === 0 ? 'Issued' : 'Voided',
  })),
  agentProfile: {
    name: 'John Doe',
    email: 'john.doe@fitsair.com',
    creditLimit: 1000.00,
  },
  agents: Array(5).fill().map((_, i) => ({
    id: `agent-${i + 1}`,
    name: `Agent ${i + 1}`,
    email: `agent${i + 1}@fitsair.com`,
  })),
  agentUsers: Array(3).fill().map((_, i) => ({
    id: `agent-user-${i + 1}`,
    name: `Agent User ${i + 1}`,
    email: `agent.user${i + 1}@fitsair.com`,
    phone: `+12345678${i}${i}`,
    role: 'AGENT_USER',
  })),
  creditBalance: { balance: 500.00 },
  creditTransactions: Array(5).fill().map((_, i) => ({
    id: `trans-${i + 1}`,
    amount: (50 + i * 20).toFixed(2),
    date: '2025-10-14',
  })),
  invoices: Array(5).fill().map((_, i) => ({
    id: `invoice-${i + 1}`,
    amount: (300 + i * 40).toFixed(2),
    date: '2025-10-14',
    status: 'Paid',
  })),
  payments: Array(5).fill().map((_, i) => ({
    id: `payment-${i + 1}`,
    amount: (100 + i * 25).toFixed(2),
    date: '2025-10-14',
    method: 'credit_card',
  })),
  salesReport: { total: 1500.00, items: Array(5).fill().map((_, i) => ({ id: `sale-${i + 1}`, amount: (200 + i * 50).toFixed(2), date: '2025-10-14' })) },
  bookingsReport: { count: 10, items: Array(5).fill().map((_, i) => ({ id: `book-${i + 1}`, customer: `Cust ${i + 1}`, date: '2025-10-14' })) },
  financialReport: { total: 2000.00, items: Array(5).fill().map((_, i) => ({ id: `fin-${i + 1}`, amount: (300 + i * 60).toFixed(2), date: '2025-10-14' })) },
  performanceReport: { score: 85, items: Array(5).fill().map((_, i) => ({ id: `perf-${i + 1}`, score: 80 + i * 5, date: '2025-10-14' })) },
  approvals: Array(3).fill().map((_, i) => ({
    id: `approval-${i + 1}`,
    name: `New Agent ${i + 1}`,
    email: `newagent${i + 1}@fitsair.com`,
  })),
  adminLogs: Array(5).fill().map((_, i) => ({
    id: `log-${i + 1}`,
    action: `Action ${i + 1}`,
    timestamp: '2025-10-14T03:10:00+0530',
  })),
  employees: Array(5).fill().map((_, i) => ({
    id: `emp-${i + 1}`,
    name: `Employee ${i + 1}`,
    email: `emp${i + 1}@fitsair.com`,
  })),
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
    } catch (e) {
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
    try {
      const res = await http.get('/api/v1/agents/users');
      return { data: res.data };
    } catch (e) {
      console.warn('Falling back to dummy agent users list');
      return Promise.resolve({ data: dummyData.agentUsers });
    }
  },
  createAgentUser: async (payload) => {
    try {
      const res = await http.post('/api/v1/agents/users', payload);
      return res.data;
    } catch (e) {
      console.warn('Mock createAgentUser called');
      return Promise.resolve({ id: 'agent-user-mock', ...payload });
    }
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
  getInvoices: () => {
    console.log('Mock getInvoices called');
    return Promise.resolve({ data: dummyData.invoices });
  },
  getInvoiceDetails: () => {
    console.log('Mock getInvoiceDetails called');
    return Promise.resolve({ data: dummyData.invoices[0] });
  },
  downloadInvoice: () => {
    console.log('Mock downloadInvoice called');
    return Promise.resolve({ data: new Blob(['PDF content']) });
  },
  makePayment: () => {
    console.log('Mock makePayment called');
    return Promise.resolve();
  },
  getPaymentHistory: () => {
    console.log('Mock getPaymentHistory called');
    return Promise.resolve({ data: dummyData.payments });
  },
  getPaymentDetails: () => {
    console.log('Mock getPaymentDetails called');
    return Promise.resolve({ data: dummyData.payments[0] });
  },
  getSalesReport: () => {
    console.log('Mock getSalesReport called');
    return Promise.resolve({ data: dummyData.salesReport });
  },
  getBookingsReport: () => {
    console.log('Mock getBookingsReport called');
    return Promise.resolve({ data: dummyData.bookingsReport });
  },
  getFinancialReport: () => {
    console.log('Mock getFinancialReport called');
    return Promise.resolve({ data: dummyData.financialReport });
  },
  getPerformanceReport: () => {
    console.log('Mock getPerformanceReport called');
    return Promise.resolve({ data: dummyData.performanceReport });
  },
  getApprovals: () => {
    console.log('Mock getApprovals called');
    return Promise.resolve({ data: dummyData.approvals });
  },
  getAdminDashboard: async () => {
    const res = await http.get('/api/v1/admin/dashboard');
    return { data: res.data };
  },
  getAdminLogs: async () => {
    const res = await http.get('/api/v1/admin/audit-logs');
    return { data: res.data };
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