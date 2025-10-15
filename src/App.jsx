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

// Simple role-based guard for routes
const RoleRoute = ({ element, allowedRoles }) => {
    const role = localStorage.getItem('role') || 'ADMIN';
    if (!allowedRoles || allowedRoles.includes(role)) return element;
    return <div className="p-6">Not authorized</div>;
};

const App = () => {
    const token = localStorage.getItem('accessToken');
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <ToastProvider>
            <div className="h-screen bg-gray-50 overflow-hidden">
                {!token ? (
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Login />} />
                    </Routes>
                ) : (
                    <div className="flex h-screen overflow-hidden">
                        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                        <div className="flex-1 flex flex-col h-screen overflow-hidden">
                            <Navbar onToggleSidebar={toggleSidebar} />
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
                                        <Route path="/" element={<Home />} />
                                        <Route path="/flights" element={<Flights />} />
                                        <Route path="/flights/:id" element={<Flights />} />
                                        <Route path="/bookings" element={<RoleRoute element={<Bookings />} allowedRoles={["AGENT"]} />} />
                                        <Route path="/tickets" element={<RoleRoute element={<Tickets />} allowedRoles={["AGENT"]} />} />
                                        <Route path="/agents" element={<Agents />} />
                                        <Route path="/employees" element={<RoleRoute element={<Employees />} allowedRoles={["ADMIN"]} />} />
                                        <Route path="/credit" element={<RoleRoute element={<Credit />} allowedRoles={["AGENT"]} />} />
                                        <Route path="/invoices" element={<Invoices />} />
                                        <Route path="/invoices/:id" element={<Invoices />} />
                                        <Route path="/payments" element={<Payments />} />
                                        <Route path="/payments/:id" element={<Payments />} />
                                        <Route path="/reports" element={<Reports />} />
                                        <Route path="/admin" element={<RoleRoute element={<Admin />} allowedRoles={["ADMIN"]} />} />
                                        <Route path="/settings" element={<Settings />} />
                                    </Routes>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                )}
            </div>
        </ToastProvider>
    );
};

export default App;