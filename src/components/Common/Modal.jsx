import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ open, onClose, title, children }) => (
    <AnimatePresence>
        {open && (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
                <motion.div
                    className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                    initial={{ y: 40, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 40, opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <div className="px-6 py-4 border-b flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                        <button className="btn btn-ghost p-2 rounded-full" onClick={onClose} aria-label="Close modal">
                            <X size={20} />
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

export default Modal;
