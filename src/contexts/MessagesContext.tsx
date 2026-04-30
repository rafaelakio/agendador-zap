import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ScheduledMessage } from '../types';
import { storageService } from '../services/storageService';
import { notificationService } from '../services/notificationService';
import { whatsappService } from '../services/whatsappService';

interface MessagesContextData {
  messages: ScheduledMessage[];
  loading: boolean;
  addMessage: (message: Omit<ScheduledMessage, 'id' | 'createdAt'>) => Promise<void>;
  updateMessage: (id: string, updates: Partial<ScheduledMessage>) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  sendMessage: (message: ScheduledMessage) => Promise<void>;
  refreshMessages: () => Promise<void>;
}

const MessagesContext = createContext<MessagesContextData>({} as MessagesContextData);

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider: React.FC<MessagesProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<ScheduledMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
    setupNotificationHandler();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const loadedMessages = await storageService.getMessages();
      setMessages(loadedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupNotificationHandler = () => {
    // Handle notification actions
    notificationService.requestPermission();
  };

  const addMessage = async (messageData: Omit<ScheduledMessage, 'id' | 'createdAt'>) => {
    try {
      const newMessage: ScheduledMessage = {
        ...messageData,
        id: Date.now().toString(),
        createdAt: new Date(),
        status: 'pending',
      };

      await storageService.addMessage(newMessage);
      await notificationService.scheduleNotification(newMessage);
      
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  };

  const updateMessage = async (id: string, updates: Partial<ScheduledMessage>) => {
    try {
      await storageService.updateMessage(id, updates);
      
      setMessages(prev =>
        prev.map(msg => (msg.id === id ? { ...msg, ...updates } : msg))
      );

      // If the scheduled date changed, reschedule the notification
      if (updates.scheduledDate) {
        const message = messages.find(msg => msg.id === id);
        if (message) {
          await notificationService.cancelNotification(id);
          await notificationService.scheduleNotification({
            ...message,
            ...updates,
          } as ScheduledMessage);
        }
      }
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await storageService.deleteMessage(id);
      await notificationService.cancelNotification(id);
      
      setMessages(prev => prev.filter(msg => msg.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  };

  const sendMessage = async (message: ScheduledMessage) => {
    try {
      const success = await whatsappService.sendMessage(
        message.contactPhone,
        message.message
      );

      if (success) {
        await updateMessage(message.id, {
          status: 'sent',
          sentAt: new Date(),
        });
      } else {
        await updateMessage(message.id, {
          status: 'failed',
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      await updateMessage(message.id, {
        status: 'failed',
      });
      throw error;
    }
  };

  const refreshMessages = async () => {
    await loadMessages();
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        loading,
        addMessage,
        updateMessage,
        deleteMessage,
        sendMessage,
        refreshMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

// Made with Bob
