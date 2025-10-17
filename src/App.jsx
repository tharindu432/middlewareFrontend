import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import Home from './pages/Home';
import Flights from './pages/Flights';
import Bookings from './pages/Bookings';
import Tickets from './pages/Tickets';
import Agents from './pages/Agents';
import Employees from './pages/Employees';
import Credit from './pages/Credit';
import Invoices from './pages/Invoices';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import {AuthProvider, useAuth} from './components/Auth/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastProvider } from './components/Common/Toast';

const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
};

const pageTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
};

// Main application content with authentication
const AppContent = () => {
    const {isAuthenticated, loading} = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // Show loading screen while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-lg text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Not authenticated - show login/register routes
    if (!isAuthenticated) {
        return (
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="*" element={<Login/>}/>
            </Routes>
        );
    }

    // Authenticated - show main application
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Navbar onToggleSidebar={toggleSidebar}/>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        className="flex-1 overflow-hidden"
                    >
                        <Routes location={location}>
                            {/* Dashboard - Available to all authenticated users */}
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute permission="view_dashboard">
                                        <Home/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Flights - Available to all users with flight permission */}
                            <Route
                                path="/flights"
                                element={
                                    <ProtectedRoute permission="view_flights">
                                        <Flights/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/flights/:id"
                                element={
                                    <ProtectedRoute permission="view_flights">
                                        <Flights/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Bookings - Only for Agent Manager, Agent User, and Employee */}
                            <Route
                                path="/bookings"
                                element={
                                    <ProtectedRoute permission="manage_bookings">
                                        <Bookings/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Tickets - Only for Agent Manager, Agent User, and Employee */}
                            <Route
                                path="/tickets"
                                element={
                                    <ProtectedRoute permission="manage_tickets">
                                        <Tickets/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Agents/Team Management - Admin manages agents, Agents manage employees */}
                            <Route
                                path="/agents"
                                element={
                                    <ProtectedRoute anyPermissions={['manage_agents', 'manage_employees']}>
                                        <Agents/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Employees - Only for Admin and Agent Manager */}
                            <Route
                                path="/employees"
                                element={
                                    <ProtectedRoute permission="manage_employees">
                                        <Employees/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Credit - Only for Agents */}
                            <Route
                                path="/credit"
                                element={
                                    <ProtectedRoute permission="view_credit">
                                        <Credit/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Invoices - Available to Agent Manager, Agent User, and Employee */}
                            <Route
                                path="/invoices"
                                element={
                                    <ProtectedRoute permission="view_invoices">
                                        <Invoices/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/invoices/:id"
                                element={
                                    <ProtectedRoute permission="view_invoices">
                                        <Invoices/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Payments - Available to Agent Manager, Agent User, and Employee */}
                            <Route
                                path="/payments"
                                element={
                                    <ProtectedRoute permission="view_payments">
                                        <Payments/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/payments/:id"
                                element={
                                    <ProtectedRoute permission="view_payments">
                                        <Payments/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Reports - Admin and Agent Manager only */}
                            <Route
                                path="/reports"
                                element={
                                    <ProtectedRoute permission="view_reports">
                                        <Reports/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Admin Panel - Admin only */}
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute permission="view_admin_panel">
                                        <Admin/>
                                    </ProtectedRoute>
                                }
                            />

                            {/* Settings - Admin and Agent Manager only */}
                            <Route
                                path="/settings"
                                element={
                                    <ProtectedRoute permission="manage_settings">
                                        <Settings/>
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <ToastProvider>
                <div className="h-screen bg-gray-50 overflow-hidden">
                    <AppContent/>
                </div>
            </ToastProvider>
        </AuthProvider>
    );
};

export default App;