import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Plane,
  Calendar,
  Ticket,
  Users,
  Briefcase,
  CreditCard,
  FileText,
  DollarSign,
  BarChart3,
  Settings,
  Wrench,
  X
} from 'lucide-react';
import {useAuth} from '../Auth/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
    const {getNavigationItems, getRoleDisplayName, getCurrentUser, isAdmin} = useAuth();

    // Get icon component for menu item
    const getIconComponent = (path) => {
        const iconMap = {
            '/': LayoutDashboard,
            '/flights': Plane,
            '/bookings': Calendar,
            '/tickets': Ticket,
            '/agents': Users,
            '/employees': Briefcase,
            '/credit': CreditCard,
            '/invoices': FileText,
            '/payments': DollarSign,
            '/reports': BarChart3,
            '/admin': Settings,
            '/settings': Wrench,
        };
        return iconMap[path] || LayoutDashboard;
    };

    // Get authorized menu items based on user permissions
    const menuItems = getNavigationItems().map(item => ({
        ...item,
        icon: getIconComponent(item.path)
    }));

    return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 h-screen shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col flex-shrink-0 overflow-hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-700/50 lg:hidden cursor-pointer transition-colors z-10"
        >
          <X size={20} className="text-slate-300" />
        </button>

        {/* Logo section - Reduced padding */}
        <div className="flex items-center gap-3 px-6 py-4 flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-white">FitsAir</h1>
            <p className="text-xs text-slate-400">Flight Management</p>
          </div>
        </div>

          {/* Navigation menu */}
          <nav className="flex-1 overflow-hidden px-4 py-2 space-y-1">
              {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                      <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => window.innerWidth < 1024 && onClose()}
                          className={({isActive}) =>
                              isActive
                                  ? 'flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-lg shadow-indigo-500/30 transition-all duration-200 cursor-pointer'
                                  : 'flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-200 cursor-pointer'
                          }
                      >
                          <Icon size={18} strokeWidth={2}/>
                          <span className="text-sm font-medium">{item.name}</span>
                      </NavLink>
                  );
              })}
          </nav>

          {/* Bottom user section */}
          <div
              className="flex-shrink-0 m-4 p-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg">
              <div className="flex items-center gap-3">
                  <div
                      className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="text-white font-semibold text-xs">
                {getRoleDisplayName().charAt(0)}
              </span>
                  </div>
                  <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                          {getCurrentUser()?.name || getRoleDisplayName()}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                          {getCurrentUser()?.email || (isAdmin() ? 'admin@fitsair.com' : 'user@fitsair.com')}
                      </p>
                  </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;