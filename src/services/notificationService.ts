import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';
import { ScheduledMessage } from '../types';

export const notificationService = {
  async requestPermission(): Promise<boolean> {
    try {
      const settings = await notifee.requestPermission();
      return settings.authorizationStatus >= 1;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  },

  async createChannel(): Promise<string> {
    try {
      const channelId = await notifee.createChannel({
        id: 'scheduled-messages',
        name: 'Mensagens Agendadas',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });
      return channelId;
    } catch (error) {
      console.error('Error creating notification channel:', error);
      throw error;
    }
  },

  async scheduleNotification(message: ScheduledMessage): Promise<string> {
    try {
      const channelId = await this.createChannel();
      
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: message.scheduledDate.getTime(),
      };

      const notificationId = await notifee.createTriggerNotification(
        {
          id: message.id,
          title: `Mensagem para ${message.contactName}`,
          body: message.message,
          android: {
            channelId,
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
              launchActivity: 'default',
            },
            actions: [
              {
                title: 'Enviar Agora',
                pressAction: {
                  id: 'send-now',
                },
              },
            ],
          },
          data: {
            messageId: message.id,
            contactPhone: message.contactPhone,
            message: message.message,
          },
        },
        trigger
      );

      return notificationId;
    } catch (error) {
      console.error('Error scheduling notification:', error);
      throw error;
    }
  },

  async cancelNotification(notificationId: string): Promise<void> {
    try {
      await notifee.cancelNotification(notificationId);
    } catch (error) {
      console.error('Error canceling notification:', error);
      throw error;
    }
  },

  async cancelAllNotifications(): Promise<void> {
    try {
      await notifee.cancelAllNotifications();
    } catch (error) {
      console.error('Error canceling all notifications:', error);
      throw error;
    }
  },

  async getTriggerNotifications(): Promise<any[]> {
    try {
      const notifications = await notifee.getTriggerNotifications();
      return notifications;
    } catch (error) {
      console.error('Error getting trigger notifications:', error);
      return [];
    }
  },
};

// Made with Bob
