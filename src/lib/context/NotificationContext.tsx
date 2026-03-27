"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "read">) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Welcome to Avi's Portfolio",
      message: "Feel free to look around and reach out if you have any questions!",
      time: "Just now",
      read: false,
    }
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (notification: Omit<Notification, "id" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      read: false,
    };
    
    // Add to the beginning of the list
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => 
      prev.map((n) => ({ ...n, read: true }))
    );
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
