/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';
import {whatsappService} from './src/services/whatsappService';

// Must be registered at module level before any React component mounts
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
    const {notification} = detail;
    if (notification?.data) {
      const {contactPhone, message} = notification.data;
      if (contactPhone && message) {
        await whatsappService.sendMessage(
          String(contactPhone),
          String(message),
        );
      }
    }
  }
});

AppRegistry.registerComponent(appName, () => App);

// Made with Bob
