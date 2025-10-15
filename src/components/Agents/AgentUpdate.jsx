import { useState } from 'react';
import { api } from '../../services/api';

const AgentUpdate = () => {
  const [formData, setFormData] = useState({ id: '', name: '', email: '' });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.updateAgentAdmin(formData.id, { name: formData.name, email: formData.email });
      alert('Agent updated successfully!');
    } catch (error) {
      console.error('Agent update failed:', error);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Update Agent</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Agent ID"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default AgentUpdate;