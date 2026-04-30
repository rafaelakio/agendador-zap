import { PermissionsAndroid, Platform, Alert, Linking } from 'react-native';
import { permissionService } from '../permissionService';
import Contacts from 'react-native-contacts';

vi.mock('react-native', () => ({
  PermissionsAndroid: {
    request: vi.fn(),
    check: vi.fn(),
    RESULTS: { GRANTED: 'granted', DENIED: 'denied' },
    PERMISSIONS: {
      READ_CONTACTS: 'android.permission.READ_CONTACTS',
      POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS',
    },
  },
  Platform: {
    OS: 'android',
    Version: 33,
  },
  Alert: { 
    alert: vi.fn((title, msg, buttons) => {
      // Simula o clique no botão de configurações se necessário
      if (buttons && buttons[1] && buttons[1].onPress) {
        buttons[1].onPress();
      }
    }) 
  },
  Linking: { openSettings: vi.fn() },
}));

vi.mock('react-native-contacts', () => ({
  default: { getAll: vi.fn().mockResolvedValue([]) }
}));

describe('permissionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Platform.OS = 'android';
    Platform.Version = 33;
  });

  it('should request POST_NOTIFICATIONS on Android 13+', async () => {
    Platform.Version = 33;
    (PermissionsAndroid.request as any).mockResolvedValue('granted');

    const result = await permissionService.requestNotificationPermission();
    
    expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      'android.permission.POST_NOTIFICATIONS',
      expect.any(Object)
    );
    expect(result).toBe(true);
  });

  it('should return true immediately on non-Android platforms', async () => {
    Platform.OS = 'ios';
    const result = await permissionService.requestContactsPermission();
    expect(result).toBe(true);
    expect(PermissionsAndroid.request).not.toHaveBeenCalled();
  });

  describe('requestScheduleExactAlarmPermission', () => {
    it('should show alert and link to settings on Android 12+', async () => {
      Platform.Version = 31;
      await permissionService.requestScheduleExactAlarmPermission();
      expect(Alert.alert).toHaveBeenCalledWith('Permissão de Alarmes', expect.any(String), expect.any(Array));
      expect(Linking.openSettings).toHaveBeenCalled();
    });
  });

  describe('checkContactsPermission', () => {
    it('should return true if permission is already granted', async () => {
      (PermissionsAndroid.check as any).mockResolvedValue(true);
      const result = await permissionService.checkContactsPermission();
      expect(result).toBe(true);
    });
  });

  describe('getContacts', () => {
    it('should fetch contacts if permission is granted', async () => {
      (PermissionsAndroid.check as any).mockResolvedValue(true);
      const mockContacts = [{ phoneNumbers: [{ number: '123' }] }];
      (Contacts.getAll as any).mockResolvedValue(mockContacts);

      const result = await permissionService.getContacts();
      expect(result).toEqual(mockContacts);
      expect(Contacts.getAll).toHaveBeenCalled();
    });

    it('should return empty array if permission is denied', async () => {
      (PermissionsAndroid.check as any).mockResolvedValue(false);
      (PermissionsAndroid.request as any).mockResolvedValue('denied');
      
      const result = await permissionService.getContacts();
      expect(result).toEqual([]);
    });
  });
});