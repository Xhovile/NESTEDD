import { useState } from 'react';
import { Notification } from '../types';

export function useNotifications() {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (next: Notification) => {
    setNotification(next);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    showNotification,
    closeNotification,
  };
}
