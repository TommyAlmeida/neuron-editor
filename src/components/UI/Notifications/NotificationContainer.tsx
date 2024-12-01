import React from 'react';
import { EditorNotification } from '../../../types/editor';
import { useStore } from '../../../store/editorStore';
import { Notification } from './Notification';

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useStore();

  console.log(notifications)
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center p-4 z-50">
      <div className="space-y-2 w-3/5 max-w-lg">
        {notifications.map((notification: EditorNotification) => (
          <Notification
            key={notification.id}
            id={notification.id!}
            message={notification.message}
            type={notification.type}
            onRemove={removeNotification}
          />
        ))}
      </div>
    </div>
  );
};
