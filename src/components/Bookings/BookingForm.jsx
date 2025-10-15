import { useState } from 'react';
import { api } from '../../services/api';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    availabilityId: '',
    contactEmail: '',
    contactPhone: '',
    passengers: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createBooking(formData);
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Booking creation failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Create Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Availability ID"
          value={formData.availabilityId}
          onChange={(e) => setFormData({ ...formData, availabilityId: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Contact Email"
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Contact Phone"
          value={formData.contactPhone}
          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default BookingForm;