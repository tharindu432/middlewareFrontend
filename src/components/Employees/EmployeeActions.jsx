import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, UserMinus, Trash2, X } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../Common/Toast';

const Modal = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <motion.div
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
        >
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const EmployeeActions = ({ onChanged }) => {
  const toast = useToast();
  const [openCreate, setOpenCreate] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [createData, setCreateData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'EMPLOYEE' });
  const [targetId, setTargetId] = useState('');
  const [loading, setLoading] = useState(false);

  const submitCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createEmployee(createData);
      toast.success('Employee created');
      setOpenCreate(false);
      setCreateData({ firstName: '', lastName: '', email: '', password: '', role: 'EMPLOYEE' });
      onChanged?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Create failed');
    } finally { setLoading(false); }
  };

  const submitDeactivate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.deactivateEmployee(targetId);
      toast.success('Employee deactivated');
      setOpenDeactivate(false);
      setTargetId('');
      onChanged?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Deactivate failed');
    } finally { setLoading(false); }
  };

  const submitDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.deleteEmployee(targetId);
      toast.success('Employee deleted');
      setOpenDelete(false);
      setTargetId('');
      onChanged?.();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Delete failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button className="btn btn-primary flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setOpenCreate(true)}>
        <Plus size={18} /> Add Employee
      </motion.button>
      <motion.button className="btn btn-outline flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setOpenDeactivate(true)}>
        <UserMinus size={18} /> Deactivate
      </motion.button>
      <motion.button className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setOpenDelete(true)}>
        <Trash2 size={18} /> Delete
      </motion.button>

      {/* Create Modal */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)} title="Add Employee">
        <form onSubmit={submitCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input className="input-field" value={createData.firstName} onChange={(e)=>setCreateData({...createData, firstName:e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input className="input-field" value={createData.lastName} onChange={(e)=>setCreateData({...createData, lastName:e.target.value})} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="input-field" value={createData.email} onChange={(e)=>setCreateData({...createData, email:e.target.value})} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Temporary Password</label>
              <input type="password" className="input-field" value={createData.password} onChange={(e)=>setCreateData({...createData, password:e.target.value})} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select className="input-field" value={createData.role} onChange={(e)=>setCreateData({...createData, role:e.target.value})}>
                <option value="EMPLOYEE">EMPLOYEE</option>
                <option value="MANAGER">MANAGER</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={()=>setOpenCreate(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </Modal>

      {/* Deactivate Modal */}
      <Modal open={openDeactivate} onClose={() => setOpenDeactivate(false)} title="Deactivate Employee">
        <form onSubmit={submitDeactivate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
            <input className="input-field" value={targetId} onChange={(e)=>setTargetId(e.target.value)} required />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={()=>setOpenDeactivate(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Processing...' : 'Deactivate'}</button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal open={openDelete} onClose={() => setOpenDelete(false)} title="Delete Employee">
        <form onSubmit={submitDelete} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
            <input className="input-field" value={targetId} onChange={(e)=>setTargetId(e.target.value)} required />
          </div>
          <p className="text-sm text-red-600">This action cannot be undone.</p>
          <div className="flex items-center justify-end gap-2">
            <button type="button" className="btn btn-outline" onClick={()=>setOpenDelete(false)}>Cancel</button>
            <button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white" disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeeActions;
