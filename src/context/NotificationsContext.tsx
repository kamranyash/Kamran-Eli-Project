import React, { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_NOTIFICATIONS } from '../data/mockNotifications';

interface NotificationsContextValue {
  unreadCount: number;
  isRead: (id: string) => boolean;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const unreadCount = MOCK_NOTIFICATIONS.length - readIds.size;

  const isRead = useCallback((id: string) => readIds.has(id), [readIds]);

  const markAsRead = useCallback((id: string) => {
    setReadIds((prev) => new Set(prev).add(id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setReadIds(new Set(MOCK_NOTIFICATIONS.map((n) => n.id)));
  }, []);

  return (
    <NotificationsContext.Provider value={{ unreadCount, isRead, markAsRead, markAllAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    return {
      unreadCount: 0,
      isRead: () => false,
      markAsRead: () => {},
      markAllAsRead: () => {},
    };
  }
  return ctx;
}
