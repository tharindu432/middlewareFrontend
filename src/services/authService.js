import {api} from './api';

// User roles and permissions
export const ROLES = {
    ADMIN: 'ADMIN',
    AGENT: 'AGENT',
    AGENT_MANAGER: 'AGENT_MANAGER',
    AGENT_USER: 'AGENT_USER',
    EMPLOYEE: 'EMPLOYEE'
};

// Permission definitions for each role
export const PERMISSIONS = {
    // Admin permissions
    [ROLES.ADMIN]: [
        'view_dashboard',
        'manage_agents',
        'manage_employees',
        'view_admin_panel',
        'manage_system_settings',
        'approve_credit_topups',
        'view_audit_logs',
        'trigger_sync',
        'view_flights',
        'view_reports',
        'manage_settings'
    ],

    // Agent Manager permissions
    [ROLES.AGENT_MANAGER]: [
        'view_dashboard',
        'manage_employees',
        'view_flights',
        'manage_bookings',
        'manage_tickets',
        'view_credit',
        'request_credit_topup',
        'view_invoices',
        'view_payments',
        'view_reports',
        'manage_settings'
    ],

    // Agent User permissions
    [ROLES.AGENT_USER]: [
        'view_dashboard',
        'view_flights',
        'manage_bookings',
        'manage_tickets',
        'view_credit',
        'view_invoices',
        'view_payments'
    ],

    // Employee permissions
    [ROLES.EMPLOYEE]: [
        'view_dashboard',
        'view_flights',
        'manage_bookings',
        'manage_tickets',
        'view_invoices',
        'view_payments'
    ]
};

// Route access control
export const ROUTE_PERMISSIONS = {
    '/': ['view_dashboard'],
    '/flights': ['view_flights'],
    '/bookings': ['manage_bookings'],
    '/tickets': ['manage_tickets'],
    '/agents': ['manage_agents', 'manage_employees'], // Admin manages agents, Agents manage employees
    '/employees': ['manage_employees'],
    '/credit': ['view_credit'],
    '/invoices': ['view_invoices'],
    '/payments': ['view_payments'],
    '/reports': ['view_reports'],
    '/admin': ['view_admin_panel'],
    '/settings': ['manage_settings']
};

class AuthService {
    constructor() {
        this.currentUser = null;
        this.currentRole = null;
        this.permissions = [];
        this.initializeAuth();
    }

    initializeAuth() {
        const token = localStorage.getItem('accessToken');
        const role = localStorage.getItem('role');
        const userInfo = localStorage.getItem('userInfo');

        if (token && role) {
            this.currentRole = role;
            this.permissions = PERMISSIONS[role] || [];

            if (userInfo) {
                try {
                    this.currentUser = JSON.parse(userInfo);
                } catch {
                    this.currentUser = null;
                }
            }
        }
    }

    async login(email, password, userType) {
        try {
            const response = await api.login(email, password, userType);
            const {token, refreshToken, user} = response.data;

            if (!token) {
                throw new Error('No authentication token received');
            }

            // Store auth data
            localStorage.setItem('accessToken', token);
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            localStorage.setItem('role', userType);
            if (user) {
                localStorage.setItem('userInfo', JSON.stringify(user));
            }

            // Update service state
            this.currentRole = userType;
            this.currentUser = user;
            this.permissions = PERMISSIONS[userType] || [];

            return response;
        } catch (error) {
            this.clearAuth();
            throw error;
        }
    }

    async logout() {
        try {
            await api.logout();
        } catch {
            // Ignore logout errors
        } finally {
            this.clearAuth();
            window.location.href = '/login';
        }
    }

    clearAuth() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');
        localStorage.removeItem('userInfo');

        this.currentUser = null;
        this.currentRole = null;
        this.permissions = [];
    }

    isAuthenticated() {
        return !!localStorage.getItem('accessToken');
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getCurrentRole() {
        return this.currentRole || localStorage.getItem('role');
    }

    getPermissions() {
        return this.permissions.length ? this.permissions : (PERMISSIONS[this.getCurrentRole()] || []);
    }

    hasPermission(permission) {
        const userPermissions = this.getPermissions();
        return userPermissions.includes(permission);
    }

    hasAnyPermission(permissions) {
        return permissions.some(permission => this.hasPermission(permission));
    }

    hasAllPermissions(permissions) {
        return permissions.every(permission => this.hasPermission(permission));
    }

    canAccessRoute(route) {
        const requiredPermissions = ROUTE_PERMISSIONS[route];
        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true; // Public route
        }
        return this.hasAnyPermission(requiredPermissions);
    }

    isAdmin() {
        return this.getCurrentRole() === ROLES.ADMIN;
    }

    isAgent() {
        const role = this.getCurrentRole();
        return role === ROLES.AGENT_MANAGER || role === ROLES.AGENT_USER;
    }

    isAgentManager() {
        return this.getCurrentRole() === ROLES.AGENT_MANAGER;
    }

    isEmployee() {
        return this.getCurrentRole() === ROLES.EMPLOYEE;
    }

    // Get user-friendly display name for role
    getRoleDisplayName() {
        const role = this.getCurrentRole();
        const displayNames = {
            [ROLES.ADMIN]: 'Administrator',
            [ROLES.AGENT_MANAGER]: 'Agent Manager',
            [ROLES.AGENT_USER]: 'Agent User',
            [ROLES.EMPLOYEE]: 'Employee'
        };
        return displayNames[role] || role;
    }

    // Get navigation items based on user role
    getNavigationItems() {
        const allItems = [
            {path: '/', name: 'Dashboard', permission: 'view_dashboard'},
            {path: '/flights', name: 'Flights', permission: 'view_flights'},
            {path: '/bookings', name: 'Bookings', permission: 'manage_bookings'},
            {path: '/tickets', name: 'Tickets', permission: 'manage_tickets'},
            {
                path: '/agents',
                name: this.isAdmin() ? 'Agents' : 'My Team',
                permission: this.isAdmin() ? 'manage_agents' : 'manage_employees'
            },
            {path: '/employees', name: 'Employees', permission: 'manage_employees'},
            {path: '/credit', name: 'Credit', permission: 'view_credit'},
            {path: '/invoices', name: 'Invoices', permission: 'view_invoices'},
            {path: '/payments', name: 'Payments', permission: 'view_payments'},
            {path: '/reports', name: 'Reports', permission: 'view_reports'},
            {path: '/admin', name: 'Admin Panel', permission: 'view_admin_panel'},
            {path: '/settings', name: 'Settings', permission: 'manage_settings'}
        ];

        return allItems.filter(item => this.hasPermission(item.permission));
    }
}

// Create singleton instance
const authService = new AuthService();

export default authService;