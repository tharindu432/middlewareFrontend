import { useState } from 'react';
import { api } from '../../services/api';

const BookingCreateModal = ({ open, onClose, onCreated }) => {
  const [form, setForm] = useState({ availabilityId: '', contactEmail: '', contactPhone: '' });
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.createBooking({ ...form, passengers: [] });
      onCreated?.();
      onClose?.();
    } catch (e) {
      alert(e?.response?.data?.message || 'Create booking failed');
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">New Booking</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability ID</label>
            <input className="input-field" value={form.availabilityId} onChange={(e)=>setForm({ ...form, availabilityId: e.target.value })} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input type="email" className="input-field" value={form.contactEmail} onChange={(e)=>setForm({ ...form, contactEmail: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
              <input className="input-field" value={form.contactPhone} onChange={(e)=>setForm({ ...form, contactPhone: e.target.value })} required />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingCreateModal;
