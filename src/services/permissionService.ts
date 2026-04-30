import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import Contacts from 'react-native-contacts';

export const permissionService = {
  async requestContactsPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Permissão de Contatos',
          message: 'O app precisa acessar seus contatos para agendar mensagens.',
          buttonPositive: 'Permitir',
          buttonNegative: 'Negar',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
      return false;
    }
  },

  async requestNotificationPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Permissão de Notificações',
            message: 'O app precisa enviar notificações para alertar sobre mensagens agendadas.',
            buttonPositive: 'Permitir',
            buttonNegative: 'Negar',
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  },

  async requestScheduleExactAlarmPermission(): Promise<boolean> {
    if (Platform.OS !== 'android' || Platform.Version < 31) {
      return true;
    }

    try {
      // For Android 12+, we need to direct users to settings
      Alert.alert(
        'Permissão de Alarmes',
        'Para garantir que as mensagens sejam enviadas no horário correto, é necessário permitir alarmes exatos nas configurações.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Abrir Configurações',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
      return true;
    } catch (error) {
      console.error('Error requesting schedule exact alarm permission:', error);
      return false;
    }
  },

  async requestBatteryOptimizationExemption(): Promise<void> {
    if (Platform.OS !== 'android') {
      return;
    }

    try {
      Alert.alert(
        'Otimização de Bateria',
        'Para garantir que as mensagens sejam enviadas mesmo com o app em segundo plano, recomendamos desativar a otimização de bateria para este app.',
        [
          {
            text: 'Agora Não',
            style: 'cancel',
          },
          {
            text: 'Configurar',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error requesting battery optimization exemption:', error);
    }
  },

  async requestAllPermissions(): Promise<{
    contacts: boolean;
    notifications: boolean;
    scheduleAlarm: boolean;
  }> {
    const contacts = await this.requestContactsPermission();
    const notifications = await this.requestNotificationPermission();
    const scheduleAlarm = await this.requestScheduleExactAlarmPermission();

    if (contacts && notifications && scheduleAlarm) {
      // Only ask for battery optimization if all other permissions are granted
      await this.requestBatteryOptimizationExemption();
    }

    return {
      contacts,
      notifications,
      scheduleAlarm,
    };
  },

  async checkContactsPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') {
      return true;
    }

    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );
      return granted;
    } catch (error) {
      console.error('Error checking contacts permission:', error);
      return false;
    }
  },

  async getContacts(): Promise<any[]> {
    try {
      const hasPermission = await this.checkContactsPermission();
      
      if (!hasPermission) {
        const granted = await this.requestContactsPermission();
        if (!granted) {
          return [];
        }
      }

      const contacts = await Contacts.getAll();
      return contacts.filter(contact => 
        contact.phoneNumbers && contact.phoneNumbers.length > 0
      );
    } catch (error) {
      console.error('Error getting contacts:', error);
      return [];
    }
  },
};

// Made with Bob
