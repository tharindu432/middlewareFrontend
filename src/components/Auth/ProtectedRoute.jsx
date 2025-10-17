import React from 'react';
import {useAuth} from './AuthContext';
import {Shield, AlertTriangle} from 'lucide-react';

const ProtectedRoute = ({children, permission, anyPermissions, allPermissions, fallback}) => {
    const {hasPermission, hasAnyPermission, hasAllPermissions, loading, isAuthenticated} = useAuth();

    // Show loading while auth is being checked
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    // Not authenticated
    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <Shield className="mx-auto h-12 w-12 text-gray-400"/>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Authentication Required</h3>
                    <p className="mt-2 text-sm text-gray-500">Please log in to access this page.</p>
                </div>
            </div>
        );
    }

    // Check permissions
    let hasAccess = true;

    if (permission && !hasPermission(permission)) {
        hasAccess = false;
    }

    if (anyPermissions && !hasAnyPermission(anyPermissions)) {
        hasAccess = false;
    }

    if (allPermissions && !hasAllPermissions(allPermissions)) {
        hasAccess = false;
    }

    // No access - show custom fallback or default unauthorized message
    if (!hasAccess) {
        if (fallback) {
            return fallback;
        }

        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-red-400"/>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Access Denied</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        You don't have permission to access this page.
                    </p>
                </div>
            </div>
        );
    }

    // Has access - render children
    return children;
};

export default ProtectedRoute;