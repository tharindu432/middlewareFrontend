import React, {createContext, useContext, useState, useEffect} from 'react';
import authService from '../../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = () => {
        try {
            const authenticated = authService.isAuthenticated();
            const currentUser = authService.getCurrentUser();
            const currentRole = authService.getCurrentRole();
            const userPermissions = authService.getPermissions();

            setIsAuthenticated(authenticated);
            setUser(currentUser);
            setRole(currentRole);
            setPermissions(userPermissions);
        } catch (error) {
            console.error('Auth initialization error:', error);
            // Clear auth on initialization error
            authService.clearAuth();
            setIsAuthenticated(false);
            setUser(null);
            setRole(null);
            setPermissions([]);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password, userType) => {
        try {
            setLoading(true);
            const response = await authService.login(email, password, userType);

            // Update state after successful login
            const currentUser = authService.getCurrentUser();
            const currentRole = authService.getCurrentRole();
            const userPermissions = authService.getPermissions();

            setIsAuthenticated(true);
            setUser(currentUser);
            setRole(currentRole);
            setPermissions(userPermissions);

            return response;
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            setRole(null);
            setPermissions([]);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear state
            setIsAuthenticated(false);
            setUser(null);
            setRole(null);
            setPermissions([]);
            setLoading(false);
        }
    };

    const hasPermission = (permission) => {
        return authService.hasPermission(permission);
    };

    const hasAnyPermission = (permissionList) => {
        return authService.hasAnyPermission(permissionList);
    };

    const hasAllPermissions = (permissionList) => {
        return authService.hasAllPermissions(permissionList);
    };

    const canAccessRoute = (route) => {
        return authService.canAccessRoute(route);
    };

    const isAdmin = () => {
        return authService.isAdmin();
    };

    const isAgent = () => {
        return authService.isAgent();
    };

    const isAgentManager = () => {
        return authService.isAgentManager();
    };

    const isEmployee = () => {
        return authService.isEmployee();
    };

    const getRoleDisplayName = () => {
        return authService.getRoleDisplayName();
    };

    const getNavigationItems = () => {
        return authService.getNavigationItems();
    };

    const getCurrentUser = () => {
        return authService.getCurrentUser();
    };

    const getCurrentRole = () => {
        return authService.getCurrentRole();
    };

    const value = {
        // State
        isAuthenticated,
        user,
        role,
        permissions,
        loading,

        // Actions
        login,
        logout,

        // Utilities
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        canAccessRoute,
        isAdmin,
        isAgent,
        isAgentManager,
        isEmployee,
        getRoleDisplayName,
        getNavigationItems,
        getCurrentUser,
        getCurrentRole,

        // Service reference for advanced usage
        authService
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;