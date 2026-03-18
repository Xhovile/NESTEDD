import React from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Notification } from '../types';

interface NotificationModalProps {
  notification: Notification | null;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ notification, onClose }) => {
  if (!notification) return null;

  const icons = {
    info: <Info className="text-blue-500" />,
    success: <CheckCircle className="text-emerald-500" />,
    warning: <AlertTriangle className="text-amber-500" />,
    error: <XCircle className="text-rose-500" />,
  };

  const bgColors = {
    info: 'bg-blue-50 dark:bg-blue-900/20',
    success: 'bg-emerald-50 dark:bg-emerald-900/20',
    warning: 'bg-amber-50 dark:bg-amber-900/20',
    error: 'bg-rose-50 dark:bg-rose-900/20',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className={`p-8 ${bgColors[notification.type]}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm">
                {React.cloneElement(icons[notification.type] as React.ReactElement, { size: 32 })}
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              {notification.title}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              {notification.message}
            </p>
            
            <button 
              onClick={onClose}
              className="w-full py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-lg"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotificationModal;
