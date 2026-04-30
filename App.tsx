import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import notifee, { EventType } from '@notifee/react-native';
import { MessagesProvider } from './src/contexts/MessagesContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { permissionService } from './src/services/permissionService';
import { whatsappService } from './src/services/whatsappService';

const App: React.FC = () => {
  useEffect(() => {
    requestPermissions();
    setupNotificationHandlers();
  }, []);

  const requestPermissions = async () => {
    try {
      await permissionService.requestAllPermissions();
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const setupNotificationHandlers = () => {
    // Handle notification press when app is in foreground or background
    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
        const { notification } = detail;
        if (notification?.data) {
          const { contactPhone, message } = notification.data;
          if (contactPhone && message) {
            await whatsappService.sendMessage(
              contactPhone as string,
              message as string
            );
          }
        }
      }
    });

    // Handle notification press when app is closed/killed
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
        const { notification } = detail;
        if (notification?.data) {
          const { contactPhone, message } = notification.data;
          if (contactPhone && message) {
            await whatsappService.sendMessage(
              contactPhone as string,
              message as string
            );
          }
        }
      }
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <MessagesProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#2196F3"
          />
          <AppNavigator />
        </MessagesProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;

// Made with Bob
