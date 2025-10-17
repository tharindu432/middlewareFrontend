// This file is now primarily for Admin use to create new Agents
import { useState } from 'react';
import { api } from '../../services/api';
import { useToast } from '../Common/ToastContext';
import Modal from '../Common/Modal';
import { Plus } from 'lucide-react';

const AgentActions = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        agentId: '', name: '', creditLimit: 10000, bankGurantee: 5000,
        defaultCurrency: 'USD', email: '', phone: '', password: '', role: 'AGENT_MANAGER'
    });
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.createAgent(formData);
            toast.success("Agent created successfully!");
            setIsModalOpen(false);
            window.dispatchEvent(new Event('agents-updated')); // Notify list to refresh
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create agent.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    }

    return (
        <>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                <Plus size={16} /> Add Agent
            </button>

            <Modal title="Create New Agent" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input name="agentId" placeholder="Agent ID (e.g., AGT002)" value={formData.agentId} onChange={handleChange} className="input-field" required />
                        <input name="name" placeholder="Agency Name" value={formData.name} onChange={handleChange} className="input-field" required />
                        <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="input-field" required />
                        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="input-field" />
                        <input name="password" type="password" placeholder="Temporary Password" value={formData.password} onChange={handleChange} className="input-field" required />
                        <select name="role" value={formData.role} onChange={handleChange} className="input-field">
                            <option value="AGENT_MANAGER">Agent Manager</option>
                            <option value="AGENT_USER">Agent User</option>
                        </select>
                        <input name="creditLimit" type="number" placeholder="Credit Limit" value={formData.creditLimit} onChange={handleChange} className="input-field" required />
                        <input name="bankGurantee" type="number" placeholder="Bank Guarantee" value={formData.bankGurantee} onChange={handleChange} className="input-field" />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Agent'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AgentActions;
