# Authorization & Role-Based Access Control Guide

## 📋 Overview

This guide provides comprehensive documentation for the role-based access control (RBAC) system implemented in the
Middleware Frontend Application. The system ensures that users can only access features and data they are authorized to
use based on their assigned roles.

## 🔐 User Roles & Permissions

### Available Roles

1. **ADMIN** - System Administrator
2. **AGENT_MANAGER** - Agent Manager
3. **AGENT_USER** - Agent User
4. **EMPLOYEE** - Employee

### Role Hierarchy & Access Levels

```
ADMIN
├── Full system access
├── Manage all agents
├── System administration
├── View audit logs
└── Configure system settings

AGENT_MANAGER
├── Manage employees/team
├── All booking operations
├── Credit management
├── View reports
└── Manage settings

AGENT_USER
├── Booking operations
├── Ticket management
├── View credit balance
└── Basic operations

EMPLOYEE
├── Basic booking operations
├── Ticket operations
└── View invoices/payments
```

## 🚪 Route Access Control

### Admin-Only Routes

- `/admin` - Admin panel and system management
- `/employees` - Employee management (Admin + Agent Manager)

### Agent-Only Routes

- `/credit` - Credit balance and top-up management
- `/bookings` - Booking management operations
- `/tickets` - Ticket management operations

### Shared Routes

- `/` - Dashboard (all authenticated users)
- `/flights` - Flight search (all authenticated users)
- `/invoices` - Invoice viewing (Agent + Employee)
- `/payments` - Payment viewing (Agent + Employee)
- `/reports` - Reports (Admin + Agent Manager)
- `/settings` - Settings (Admin + Agent Manager)

## 🔧 Implementation Details

### Authentication Service

```javascript
import { authService, ROLES, PERMISSIONS } from './services';

// Check user role
const isAdmin = authService.isAdmin();
const isAgent = authService.isAgent();
const isAgentManager = authService.isAgentManager();

// Check permissions
const canManageEmployees = authService.hasPermission('manage_employees');
const canViewReports = authService.hasPermission('view_reports');

// Check multiple permissions
const canAccessBookings = authService.hasAnyPermission(['manage_bookings', 'view_bookings']);
```

### Protected Routes

```javascript
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Single permission check
<ProtectedRoute permission="manage_employees">
  <EmployeeManagement />
</ProtectedRoute>

// Multiple permission check (ANY)
<ProtectedRoute anyPermissions={['manage_agents', 'manage_employees']}>
  <TeamManagement />
</ProtectedRoute>

// Custom fallback for unauthorized access
<ProtectedRoute 
  permission="view_admin_panel"
  fallback={<div>Admin access required</div>}
>
  <AdminPanel />
</ProtectedRoute>
```

### Context Usage

```javascript
import { useAuth } from './components/Auth/AuthContext';

function MyComponent() {
  const { 
    user, 
    role, 
    hasPermission, 
    isAdmin, 
    getRoleDisplayName 
  } = useAuth();

  if (!hasPermission('manage_bookings')) {
    return <div>Not authorized</div>;
  }

  return (
    <div>
      <h1>Welcome {user?.name || getRoleDisplayName()}</h1>
      {isAdmin() && <AdminControls />}
    </div>
  );
}
```

## 📱 Component-Level Access Control

### Conditional Rendering

```javascript
import { useAuth } from './components/Auth/AuthContext';

function Toolbar() {
  const { hasPermission, isAdmin, isAgentManager } = useAuth();

  return (
    <div className="toolbar">
      {hasPermission('manage_bookings') && (
        <button>Create Booking</button>
      )}
      
      {(isAdmin() || isAgentManager()) && (
        <button>View Reports</button>
      )}
      
      {hasPermission('approve_credit_topups') && (
        <button>Approve Credits</button>
      )}
    </div>
  );
}
```

### Navigation Menu

```javascript
import { useAuth } from './components/Auth/AuthContext';

function Navigation() {
  const { getNavigationItems } = useAuth();
  const menuItems = getNavigationItems(); // Returns only authorized items

  return (
    <nav>
      {menuItems.map(item => (
        <NavLink key={item.path} to={item.path}>
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
```

## 🔌 API Service Integration

### Automatic Authorization

All API services automatically include authorization headers:

```javascript
import { agentService, creditService, adminService } from './services';

// These calls automatically include user's auth token
const agents = await agentService.getAllAgents(); // Admin only
const balance = await creditService.getCreditBalance(); // Agent only
const stats = await adminService.getDashboardStatistics(); // Admin only
```

### Service-Level Access Control

```javascript
import { authService, agentService } from './services';

async function handleAgentCreation(agentData) {
  // Check permission before API call
  if (!authService.hasPermission('manage_agents')) {
    throw new Error('Not authorized to create agents');
  }
  
  try {
    const result = await agentService.createAgent(agentData);
    return result;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('Access denied: Insufficient permissions');
    }
    throw error;
  }
}
```

## 🎯 Specific Use Cases

### Agent Management

```javascript
// Admin can manage all agents
if (authService.isAdmin()) {
  const agents = await agentService.getAllAgents();
  const newAgent = await agentService.createAgent(agentData);
}

// Agents can only view/update their own profile
if (authService.isAgent()) {
  const profile = await agentService.getProfile();
  const updated = await agentService.updateProfile(profileData);
}
```

### Employee Management

```javascript
// Only Admin and Agent Manager can manage employees
if (authService.hasPermission('manage_employees')) {
  const employees = await employeeService.getAllEmployees();
  const newEmployee = await employeeService.createEmployee(employeeData);
}
```

### Credit Management

```javascript
// Only agents can manage credit
if (authService.hasPermission('view_credit')) {
  const balance = await creditService.getCreditBalance();
  const topup = await creditService.requestCreditTopup(topupData);
}

// Only admin can approve credit top-ups
if (authService.hasPermission('approve_credit_topups')) {
  await creditService.approveCreditTopup(topupId);
}
```

## 🚨 Error Handling

### API Response Errors

```javascript
try {
  const result = await someApiCall();
} catch (error) {
  if (error.response?.status === 401) {
    // Token expired or invalid - redirect to login
    authService.logout();
  } else if (error.response?.status === 403) {
    // Insufficient permissions
    showError('You do not have permission to perform this action');
  } else {
    // Other error
    showError('An error occurred: ' + error.message);
  }
}
```

### Frontend Permission Checks

```javascript
function handleAction() {
  if (!authService.hasPermission('required_permission')) {
    showError('Access denied: Insufficient permissions');
    return;
  }
  
  // Proceed with action
  performAction();
}
```

## 🔄 Token Management

### Automatic Token Refresh

The system automatically handles token refresh:

```javascript
// No manual intervention needed - handled by axios interceptors
const data = await api.someProtectedEndpoint();

// Token refresh happens automatically if needed
// If refresh fails, user is redirected to login
```

### Manual Token Operations

```javascript
// Check if user is authenticated
if (authService.isAuthenticated()) {
  // User is logged in
}

// Force logout
await authService.logout();

// Get current user info
const user = authService.getCurrentUser();
const role = authService.getCurrentRole();
```

## 📊 Dashboard Customization

### Role-Based Dashboard Content

```javascript
function Dashboard() {
  const { isAdmin, isAgent, hasPermission } = useAuth();

  return (
    <div className="dashboard">
      {/* Common content for all users */}
      <WelcomeMessage />
      
      {/* Admin-specific content */}
      {isAdmin() && (
        <AdminStatistics />
      )}
      
      {/* Agent-specific content */}
      {isAgent() && (
        <AgentMetrics />
      )}
      
      {/* Permission-based content */}
      {hasPermission('view_reports') && (
        <ReportsWidget />
      )}
    </div>
  );
}
```

## 🛡️ Security Best Practices

### 1. Always Check Permissions

```javascript
// ❌ Bad - Assuming user has permission
const data = await someApiCall();

// ✅ Good - Check permission first
if (authService.hasPermission('required_permission')) {
  const data = await someApiCall();
}
```

### 2. Handle Auth Errors Gracefully

```javascript
// ❌ Bad - Ignoring auth errors
try {
  await apiCall();
} catch (error) {
  console.error(error);
}

// ✅ Good - Handling auth errors
try {
  await apiCall();
} catch (error) {
  if (error.response?.status === 401) {
    authService.logout(); // Force re-login
  } else if (error.response?.status === 403) {
    showAccessDeniedMessage();
  }
}
```

### 3. Use ProtectedRoute for Sensitive Pages

```javascript
// ❌ Bad - No protection
<Route path="/admin" element={<AdminPanel />} />

// ✅ Good - Protected route
<Route path="/admin" element={
  <ProtectedRoute permission="view_admin_panel">
    <AdminPanel />
  </ProtectedRoute>
} />
```

### 4. Validate on Both Frontend and Backend

```javascript
// Frontend validation (UX)
if (!authService.hasPermission('manage_agents')) {
  showError('Not authorized');
  return;
}

// Backend will also validate (Security)
// API call will return 403 if not authorized
```

## 🧪 Testing Authorization

### Unit Testing

```javascript
import { authService } from '../services';

describe('Authorization', () => {
  beforeEach(() => {
    // Mock authenticated admin user
    authService.currentRole = 'ADMIN';
    authService.permissions = PERMISSIONS.ADMIN;
  });

  test('admin can access admin panel', () => {
    expect(authService.hasPermission('view_admin_panel')).toBe(true);
  });

  test('agent cannot access admin panel', () => {
    authService.currentRole = 'AGENT_USER';
    authService.permissions = PERMISSIONS.AGENT_USER;
    expect(authService.hasPermission('view_admin_panel')).toBe(false);
  });
});
```

## 📝 Role Definitions Reference

### Admin Permissions

- `view_dashboard`
- `manage_agents`
- `manage_employees`
- `view_admin_panel`
- `manage_system_settings`
- `approve_credit_topups`
- `view_audit_logs`
- `trigger_sync`
- `view_flights`
- `view_reports`
- `manage_settings`

### Agent Manager Permissions

- `view_dashboard`
- `manage_employees`
- `view_flights`
- `manage_bookings`
- `manage_tickets`
- `view_credit`
- `request_credit_topup`
- `view_invoices`
- `view_payments`
- `view_reports`
- `manage_settings`

### Agent User Permissions

- `view_dashboard`
- `view_flights`
- `manage_bookings`
- `manage_tickets`
- `view_credit`
- `view_invoices`
- `view_payments`

### Employee Permissions

- `view_dashboard`
- `view_flights`
- `manage_bookings`
- `manage_tickets`
- `view_invoices`
- `view_payments`

---

## 🚀 Quick Start

1. **Wrap your app with AuthProvider**:

```javascript
import { AuthProvider } from './components/Auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}
```

2. **Use authentication in components**:

```javascript
import { useAuth } from './components/Auth/AuthContext';

function MyComponent() {
  const { hasPermission, isAdmin } = useAuth();
  
  return (
    <div>
      {hasPermission('manage_bookings') && <BookingButton />}
      {isAdmin() && <AdminControls />}
    </div>
  );
}
```

3. **Protect routes**:

```javascript
import ProtectedRoute from './components/Auth/ProtectedRoute';

<Route path="/admin" element={
  <ProtectedRoute permission="view_admin_panel">
    <AdminPanel />
  </ProtectedRoute>
} />
```

4. **Use services with automatic authorization**:

```javascript
import { agentService } from './services';

const agents = await agentService.getAllAgents(); // Auto-authorized
```

This authorization system provides comprehensive security while maintaining a smooth user experience. All permissions
are enforced both on the frontend (for UX) and backend (for security).