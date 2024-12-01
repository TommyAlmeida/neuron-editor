import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

interface NotificationProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onRemove: (id: string) => void;
}

const notificationStyles = {
  success: 'border-green-500',
  error: 'border-red-500',
  info: 'border-blue-500',
};

export const Notification: React.FC<NotificationProps> = ({ id, message, type, onRemove }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemove(id);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`bg-neutral-950 shadow-xl border-b-2 p-4 rounded ${notificationStyles[type]} mb-2`}>
      
      <span className='text-white'>{message}</span>
    </motion.div>
  );
};
