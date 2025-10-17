import axios from 'axios';

// Configure API base URL via Vite env or fallback
const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://localhost:8080';

// Create axios instance with base configuration
const http = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
http.interceptors.response.use(
    (response) => response,
  async (error) => {
    const originalRequest = error.config || {};

      if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

        try {
        const refreshToken = localStorage.getItem('refreshToken');
          if (!refreshToken) throw new Error('No refresh token available');

          const response = await http.post('/api/v1/auth/refresh', {
              refreshToken
          });

          const newAccessToken = response?.data?.token || response?.data?.accessToken;
          const newRefreshToken = response?.data?.refreshToken;

          if (!newAccessToken) throw new Error('No token in refresh response');

          localStorage.setItem('accessToken', newAccessToken);
          if (newRefreshToken) {
              localStorage.setItem('refreshToken', newRefreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return http(originalRequest);

      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
          localStorage.removeItem('role');
          localStorage.removeItem('userInfo');

          if (typeof window !== 'undefined') {
              window.location.href = '/login';
          }
          return Promise.reject(refreshError);
      }
    }

      return Promise.reject(error);
  }
);

// Helper function to extract token from various response formats
const extractToken = (responseData) => {
    if (!responseData) return undefined;
  return (
      responseData.token ||
      responseData.accessToken ||
      responseData.jwt ||
      (responseData.data && (responseData.data.token || responseData.data.accessToken))
  );
};

// Complete API service matching the integration guide
const api = {
    // ========================================
    // AUTHENTICATION ENDPOINTS
    // ========================================

    async login(email, password, userType = 'ADMIN') {
      const response = await http.post('/api/v1/auth/login', {
          email,
          password,
          userType
      });
      const token = extractToken(response.data);
      const refreshToken = response?.data?.refreshToken;
      return {
          message: "Login successful",
          data: {token, refreshToken, user: response.data.user}
      };
  },

  async registerAdmin(payload) {
      const response = await http.post('/api/v1/auth/register/admin', payload);
      return {
          message: "Admin registered successfully",
          data: response.data
      };
  },

    async refreshToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await http.post('/api/v1/auth/refresh', {refreshToken});
        const token = extractToken(response.data);
        const newRefreshToken = response?.data?.refreshToken;
        return {
            message: "Token refreshed successfully",
            data: {token, refreshToken: newRefreshToken}
        };
    },

    async logout() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await http.post('/api/v1/auth/logout', { refreshToken });
        return {message: "Logout successful", data: null};
    } catch (error) {
        // Ignore backend logout failures, proceed with client cleanup
        return {message: "Logout completed", data: null};
    }
  },

    // ========================================
    // AGENT ENDPOINTS (Admin Operations)
    // ========================================

    async getAllAgents() {
        const response = await http.get('/api/v1/admin/agents');
        return {
            message: "Agents retrieved successfully",
            data: response.data
        };
  },

    async createAgent(payload) {
        const response = await http.post('/api/v1/admin/agents', payload);
        return {
            message: "Agent created successfully",
            data: response.data
        };
  },

    async updateAgentAdmin(agentId, payload) {
        const response = await http.put(`/api/v1/admin/agents/${agentId}`, payload);
        return {
            message: "Agent updated successfully",
            data: response.data
        };
  },

    async deleteAgent(agentId) {
        const response = await http.delete(`/api/v1/admin/agents/${agentId}`);
        return {
            message: "Agent deleted successfully",
            data: response.data
        };
  },

    // ========================================
    // AGENT ENDPOINTS (Self-Service)
    // ========================================

    async getProfile() {
        const response = await http.get('/api/v1/agents/profile');
        return {
            message: "Profile retrieved successfully",
            data: response.data
        };
  },

    async updateProfile(payload) {
        const response = await http.put('/api/v1/agents/profile', payload);
        return {
            message: "Profile updated successfully",
            data: response.data
        };
  },

    async getStatistics() {
        const response = await http.get('/api/v1/agents/statistics');
        return {
            message: "Statistics retrieved successfully",
            data: response.data
        };
  },

    // ========================================
    // EMPLOYEE ENDPOINTS
    // ========================================

    async getAllEmployees() {
        const response = await http.get('/api/v1/employees');
        return {
            message: "Employees retrieved successfully",
            data: response.data
        };
  },

    async createEmployee(payload) {
        const response = await http.post('/api/v1/employees', payload);
        return {
            message: "Employee created successfully",
            data: response.data
        };
  },

    async updateEmployee(employeeId, payload) {
        const response = await http.put(`/api/v1/employees/${employeeId}`, payload);
        return {
            message: "Employee updated successfully",
            data: response.data
        };
  },

    async deleteEmployee(employeeId) {
        const response = await http.delete(`/api/v1/employees/${employeeId}`);
        return {
            message: "Employee deleted successfully",
            data: response.data
        };
  },

    async deactivateEmployee(employeeId) {
        const response = await http.post(`/api/v1/employees/${employeeId}/deactivate`);
        return {
            message: "Employee deactivated successfully",
            data: response.data
        };
  },

    async resetEmployeePassword(employeeId, payload) {
        const response = await http.post(`/api/v1/employees/${employeeId}/reset-password`, payload);
        return {
            message: "Password reset successfully",
            data: response.data
        };
  },

    // ========================================
    // CREDIT ENDPOINTS
    // ========================================

    async getCreditBalance() {
        const response = await http.get('/api/v1/credit/balance');
        return {
            message: "Credit balance retrieved successfully",
            data: response.data
        };
  },

    async getCreditTransactions() {
        const response = await http.get('/api/v1/credit/transactions');
        return {
            message: "Credit transactions retrieved successfully",
            data: response.data
        };
  },

    async requestCreditTopup(payload) {
        const response = await http.post('/api/v1/credit/topup', payload);
        return {
            message: "Credit top-up requested successfully",
            data: response.data
        };
  },

    async getTopupHistory() {
        const response = await http.get('/api/v1/credit/topups');
        return {
            message: "Top-up history retrieved successfully",
            data: response.data
        };
  },

    async approveCreditTopup(topupId) {
        const response = await http.post(`/api/v1/admin/credit-topups/${topupId}/approve`);
        return {
            message: "Credit top-up approved successfully",
            data: response.data
        };
  },

    async rejectCreditTopup(topupId) {
        const response = await http.post(`/api/v1/admin/credit-topups/${topupId}/reject`);
        return {
            message: "Credit top-up rejected successfully",
            data: response.data
        };
  },

    // ========================================
    // FLIGHT ENDPOINTS
    // ========================================

    async searchFlights(params) {
        const response = await http.get('/api/v1/flights/search', {params});
        return {
            message: "Flights retrieved successfully",
            data: response.data
        };
  },

    async getFlightDetails(availabilityId) {
        const response = await http.get(`/api/v1/flights/${availabilityId}`);
        return {
            message: "Flight details retrieved successfully",
            data: response.data
        };
  },

    async getFareRules(fareId) {
        const response = await http.get(`/api/v1/flights/fares/${fareId}/rules`);
        return {
            message: "Fare rules retrieved successfully",
            data: response.data
        };
  },

    // ========================================
    // BOOKING ENDPOINTS
    // ========================================

    async createBooking(payload) {
        const response = await http.post('/api/v1/bookings', payload);
        return {
            message: "Booking created successfully",
            data: response.data
        };
  },

    async getBookingDetails(bookingId) {
        const response = await http.get(`/api/v1/bookings/${bookingId}`);
        return {
            message: "Booking details retrieved successfully",
            data: response.data
        };
  },

    async searchBookings(params) {
        const response = await http.get('/api/v1/bookings', {params});
        return {
            message: "Bookings retrieved successfully",
            data: response.data
        };
  },

    async cancelBooking(bookingId) {
        const response = await http.post(`/api/v1/bookings/${bookingId}/cancel`);
        return {
            message: "Booking cancelled successfully",
            data: response.data
        };
  },

    async reconfirmBooking(bookingId) {
        const response = await http.post(`/api/v1/bookings/${bookingId}/reconfirm`);
        return {
            message: "Booking reconfirmed successfully",
            data: response.data
        };
  },

    // ========================================
    // TICKET ENDPOINTS
    // ========================================

    async issueTickets(payload) {
        const response = await http.post('/api/v1/tickets/issue', payload);
        return {
            message: "Tickets issued successfully",
            data: response.data
        };
  },

    async getTicketDetails(ticketId) {
        const response = await http.get(`/api/v1/tickets/${ticketId}`);
        return {
            message: "Ticket details retrieved successfully",
            data: response.data
        };
  },

    async searchTickets(params) {
        const response = await http.get('/api/v1/tickets', {params});
        return {
            message: "Tickets retrieved successfully",
            data: response.data
        };
  },

    async voidTicket(ticketId) {
        const response = await http.post(`/api/v1/tickets/${ticketId}/void`);
        return {
            message: "Ticket voided successfully",
            data: response.data
        };
  },

    async refundTicket(ticketId) {
        const response = await http.post(`/api/v1/tickets/${ticketId}/refund`);
        return {
            message: "Ticket refunded successfully",
            data: response.data
        };
  },

    // ========================================
    // ADMIN ENDPOINTS
    // ========================================

    async getDashboardStatistics() {
        const response = await http.get('/api/v1/admin/dashboard');
        return {
            message: "Dashboard statistics retrieved successfully",
            data: response.data
        };
  },

    async getSyncLogs() {
        const response = await http.get('/api/v1/admin/sync-logs');
        return {
            message: "Sync logs retrieved successfully",
            data: response.data
        };
  },

    async triggerSync() {
        const response = await http.post('/api/v1/admin/sync/trigger');
        return {
            message: "Sync triggered successfully",
            data: response.data
        };
  },

    async getAuditLogs() {
        const response = await http.get('/api/v1/admin/audit-logs');
        return {
            message: "Audit logs retrieved successfully",
            data: response.data
        };
  },

    async updateSystemSetting(key, payload) {
        const response = await http.put(`/api/v1/admin/settings/${encodeURIComponent(key)}`, payload);
        return {
            message: "System setting updated successfully",
            data: response.data
        };
  },

    // ========================================
    // LEGACY SUPPORT (for backward compatibility)
    // ========================================

    // Legacy aliases for existing code
    getAgentProfile: function () {
        return this.getProfile();
    },
    updateAgent(payload) {
        return this.updateProfile(payload);
    },
    getAgentStatistics() {
        return this.getStatistics();
    },
    getAgentUsers() {
        return this.getAllEmployees();
    },
    createAgentUser(payload) {
        return this.createEmployee(payload);
    },
    getAgents() {
        return this.getAllAgents();
    },
    topupCredit(payload) {
        return this.requestCreditTopup(payload);
    },
    getCreditHistory() {
        return this.getTopupHistory();
    },
    getAdminDashboard() {
        return this.getDashboardStatistics();
    },
    getAdminLogs() {
        return this.getAuditLogs();
    },
    getEmployees() {
        return this.getAllEmployees();
    },
    getBooking(id) {
        return this.getBookingDetails(id);
    },
    issueTicket(payload) {
        return this.issueTickets(payload);
    },
    getTicket(id) {
        return this.getTicketDetails(id);
    }
};

export { api };