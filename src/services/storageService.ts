import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScheduledMessage } from '../types';

const STORAGE_KEY = '@agendador_zap:messages';

export const storageService = {
  async getMessages(): Promise<ScheduledMessage[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const messages = JSON.parse(data);
      // Convert date strings back to Date objects
      return messages.map((msg: any) => ({
        ...msg,
        scheduledDate: new Date(msg.scheduledDate),
        createdAt: new Date(msg.createdAt),
        sentAt: msg.sentAt ? new Date(msg.sentAt) : undefined,
      }));
    } catch (error) {
      console.error('Error loading messages:', error);
      return [];
    }
  },

  async saveMessages(messages: ScheduledMessage[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages:', error);
      throw error;
    }
  },

  async addMessage(message: ScheduledMessage): Promise<void> {
    try {
      const messages = await this.getMessages();
      messages.push(message);
      await this.saveMessages(messages);
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  },

  async updateMessage(id: string, updates: Partial<ScheduledMessage>): Promise<void> {
    try {
      const messages = await this.getMessages();
      const index = messages.findIndex(msg => msg.id === id);
      
      if (index !== -1) {
        messages[index] = { ...messages[index], ...updates };
        await this.saveMessages(messages);
      }
    } catch (error) {
      console.error('Error updating message:', error);
      throw error;
    }
  },

  async deleteMessage(id: string): Promise<void> {
    try {
      const messages = await this.getMessages();
      const filtered = messages.filter(msg => msg.id !== id);
      await this.saveMessages(filtered);
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

// Made with Bob
