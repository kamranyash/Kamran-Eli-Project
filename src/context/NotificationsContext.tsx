import React, { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';

interface NotificationsContextValue {
  unreadCount: number;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(MOCK_NOTIFICATIONS.length);

  const markAllAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return (
    <NotificationsContext.Provider value={{ unreadCount, markAllAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    return {
      unreadCount: 0,
      markAllAsRead: () => {},
    };
  }
  return ctx;
}
