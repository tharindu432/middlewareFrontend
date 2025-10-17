import { useEffect, useState } from 'react';
import { api } from '../../services/api';

const AgentEdit = ({ open, onClose, agent, onSaved, isAdmin = true }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: 'AGENT_MANAGER' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (agent) {
      setForm({
        name: agent.name || agent.companyName || '',
        email: agent.email || '',
        phone: agent.phone || '',
        role: agent.role || agent.userRole || 'AGENT_MANAGER',
      });
    }
  }, [agent]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agent?.id) return;
    setSaving(true);
    try {
      if (isAdmin) {
        await api.updateAgentAdmin(agent.id, { name: form.name, email: form.email, phone: form.phone, role: form.role });
      } else {
        await api.updateAgent({ name: form.name, phone: form.phone });
      }
      onSaved?.();
      onClose?.();
    } catch (err) {
      alert(err?.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Edit Agent</h3>
          <p className="text-sm text-gray-600">Update agent details</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input className="input-field" value={form.name} onChange={(e)=>setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="input-field" value={form.email} onChange={(e)=>setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input className="input-field" value={form.phone} onChange={(e)=>setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>
          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select className="input-field" value={form.role} onChange={(e)=>setForm({ ...form, role: e.target.value })}>
                <option value="AGENT_MANAGER">AGENT_MANAGER</option>
                <option value="AGENT_USER">AGENT_USER</option>
              </select>
            </div>
          )}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentEdit;
