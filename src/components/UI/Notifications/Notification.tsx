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
    <div className={`bg-neutral-800 shadow-xl border p-4 rounded text-white ${notificationStyles[type]} mb-2`}>
      <span>{message}</span>
    </div>
  );
};
