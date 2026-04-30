import { Linking, Alert } from 'react-native';

export const whatsappService = {
  async isWhatsAppInstalled(): Promise<boolean> {
    try {
      const canOpen = await Linking.canOpenURL('whatsapp://send');
      return canOpen;
    } catch (error) {
      console.error('Error checking WhatsApp installation:', error);
      return false;
    }
  },

  formatPhoneNumber(phone: string): string {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    
    // If number starts with 0, remove it
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1);
    }
    
    // If number doesn't have country code, add Brazil's code (55)
    if (cleaned.length <= 11) {
      cleaned = '55' + cleaned;
    }
    
    return cleaned;
  },

  async sendMessage(phone: string, message: string): Promise<boolean> {
    try {
      const isInstalled = await this.isWhatsAppInstalled();
      
      if (!isInstalled) {
        Alert.alert(
          'WhatsApp não encontrado',
          'Por favor, instale o WhatsApp para enviar mensagens.',
          [{ text: 'OK' }]
        );
        return false;
      }

      const formattedPhone = this.formatPhoneNumber(phone);
      const encodedMessage = encodeURIComponent(message);
      const url = `whatsapp://send?phone=${formattedPhone}&text=${encodedMessage}`;

      const canOpen = await Linking.canOpenURL(url);
      
      if (canOpen) {
        await Linking.openURL(url);
        return true;
      } else {
        Alert.alert(
          'Erro',
          'Não foi possível abrir o WhatsApp.',
          [{ text: 'OK' }]
        );
        return false;
      }
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao tentar abrir o WhatsApp.',
        [{ text: 'OK' }]
      );
      return false;
    }
  },

  async openWhatsApp(): Promise<void> {
    try {
      const isInstalled = await this.isWhatsAppInstalled();
      
      if (isInstalled) {
        await Linking.openURL('whatsapp://');
      } else {
        Alert.alert(
          'WhatsApp não encontrado',
          'Por favor, instale o WhatsApp.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
    }
  },
};

// Made with Bob
