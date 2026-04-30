// Jest setup file
import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Notifee
jest.mock('@notifee/react-native', () => ({
  requestPermission: jest.fn(() => Promise.resolve({ authorizationStatus: 1 })),
  createChannel: jest.fn(() => Promise.resolve('test-channel')),
  createTriggerNotification: jest.fn(() => Promise.resolve('test-notification-id')),
  cancelNotification: jest.fn(() => Promise.resolve()),
  cancelAllNotifications: jest.fn(() => Promise.resolve()),
  getTriggerNotifications: jest.fn(() => Promise.resolve([])),
  onForegroundEvent: jest.fn(),
  onBackgroundEvent: jest.fn(),
  AndroidImportance: {
    HIGH: 4,
  },
  TriggerType: {
    TIMESTAMP: 0,
  },
  EventType: {
    PRESS: 1,
    ACTION_PRESS: 2,
  },
}));

// Mock React Native Contacts
jest.mock('react-native-contacts', () => ({
  getAll: jest.fn(() => Promise.resolve([])),
  checkPermission: jest.fn(() => Promise.resolve('authorized')),
  requestPermission: jest.fn(() => Promise.resolve('authorized')),
}));

// Mock React Native Permissions
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.PermissionsAndroid = {
    PERMISSIONS: {
      READ_CONTACTS: 'android.permission.READ_CONTACTS',
      POST_NOTIFICATIONS: 'android.permission.POST_NOTIFICATIONS',
    },
    RESULTS: {
      GRANTED: 'granted',
      DENIED: 'denied',
      NEVER_ASK_AGAIN: 'never_ask_again',
    },
    request: jest.fn(() => Promise.resolve('granted')),
    check: jest.fn(() => Promise.resolve(true)),
  };
  RN.Platform = {
    ...RN.Platform,
    OS: 'android',
    Version: 33,
  };
  RN.Linking = {
    canOpenURL: jest.fn(() => Promise.resolve(true)),
    openURL: jest.fn(() => Promise.resolve()),
    openSettings: jest.fn(() => Promise.resolve()),
  };
  RN.Alert = {
    alert: jest.fn(),
  };
  return RN;
});

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
  };
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Global test timeout
jest.setTimeout(10000);

// Made with Bob
