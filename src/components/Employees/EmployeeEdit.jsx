import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../Common/Toast';

const EmployeeEdit = ({ open, onClose, employee, onSaved }) => {
  const toast = useToast();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', role: 'EMPLOYEE' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (employee) {
      setForm({
        firstName: employee.firstName || employee.name?.split(' ')?.[0] || '',
        lastName: employee.lastName || employee.name?.split(' ')?.slice(1).join(' ') || '',
        email: employee.email || '',
        role: employee.role || 'EMPLOYEE',
      });
    }
  }, [employee]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employee?.id) return;
    setSaving(true);
    try {
      await api.updateEmployee(employee.id, form);
      toast.success('Employee updated');
      onSaved?.();
      onClose?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Edit Employee</h3>
          <p className="text-sm text-gray-600">Update employee details</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input className="input-field" value={form.firstName} onChange={(e)=>setForm({ ...form, firstName: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input className="input-field" value={form.lastName} onChange={(e)=>setForm({ ...form, lastName: e.target.value })} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="input-field" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="input-field" value={form.role} onChange={(e)=>setForm({ ...form, role: e.target.value })}>
              <option value="EMPLOYEE">EMPLOYEE</option>
              <option value="MANAGER">MANAGER</option>
            </select>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;
