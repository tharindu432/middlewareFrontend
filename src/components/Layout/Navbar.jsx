import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, LogOut, Menu } from 'lucide-react';

const Navbar = ({ onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const role = localStorage.getItem('role') || 'ADMIN';

  // Get page title from current path
  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/': 'Dashboard',
      '/flights': 'Flights',
      '/bookings': 'Bookings',
      '/tickets': 'Tickets',
      '/agents': role === 'AGENT' ? 'My Users' : 'Agents',
      '/employees': 'Employees',
      '/credit': 'Credit',
      '/invoices': 'Invoices',
      '/payments': 'Payments',
      '/reports': 'Reports',
      '/admin': 'Admin',
      '/settings': 'Settings',
    };
    return titles[path] || 'Dashboard';
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-30 backdrop-blur-sm bg-white/95 flex-shrink-0">
      {/* Left section - Hamburger and Page title */}
      <div className="flex items-center gap-4">
        {/* Hamburger menu button - Always visible */}
        <button
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl hover:bg-indigo-50 transition-all duration-200 cursor-pointer group"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} className="text-slate-600 group-hover:text-indigo-600 transition-colors" />
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-900">{getPageTitle()}</h1>
          <p className="text-sm text-slate-500">Welcome back, {role === 'ADMIN' ? 'Admin' : role === 'AGENT' ? 'Agent' : role}!</p>
        </div>
      </div>


      {/* Right section - Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64 bg-slate-50 hover:bg-white transition-colors"
          />
          <Search className="absolute left-3 top-3 text-slate-400" size={16} />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className="p-2.5 hover:bg-indigo-50 rounded-xl relative transition-all duration-200 cursor-pointer group"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} className="text-slate-600 group-hover:text-indigo-600 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">3</span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-4 z-50 animate-slide-in">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
                <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">
                  Mark all read
                </button>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors border border-transparent hover:border-indigo-200">
                  <p className="text-sm text-slate-900 font-medium">New booking created</p>
                  <p className="text-xs text-slate-500 mt-1">2 min ago</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors border border-transparent hover:border-indigo-200">
                  <p className="text-sm text-slate-900 font-medium">Payment received</p>
                  <p className="text-xs text-slate-500 mt-1">15 min ago</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* User profile */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl cursor-pointer transition-all duration-200">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">{role === 'ADMIN' ? 'Admin User' : 'Agent User'}</p>
            <p className="text-xs text-slate-500">{role === 'ADMIN' ? 'Administrator' : 'Agent'}</p>
          </div>
        </div>

        {/* Logout button */}
        <button
          className="p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 cursor-pointer group"
          onClick={async () => {
            try {
              const { api } = await import('../../services/api');
              await api.logout();
            } catch {}
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('role');
            window.location.href = '/login';
          }}
          title="Logout"
        >
          <LogOut size={20} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>

    </nav>
  );
};

export default Navbar;