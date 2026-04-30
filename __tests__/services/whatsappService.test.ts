import { Linking, Alert } from 'react-native';
import { whatsappService } from '../whatsappService';

vi.mock('react-native', () => ({
  Linking: {
    canOpenURL: vi.fn(),
    openURL: vi.fn(),
  },
  Alert: {
    alert: vi.fn(),
  },
}));

describe('whatsappService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('isWhatsAppInstalled', () => {
    it('should return true if WhatsApp can be opened', async () => {
      (Linking.canOpenURL as any).mockResolvedValue(true);
      const result = await whatsappService.isWhatsAppInstalled();
      expect(result).toBe(true);
      expect(Linking.canOpenURL).toHaveBeenCalledWith('whatsapp://send');
    });

    it('should return false if WhatsApp cannot be opened', async () => {
      (Linking.canOpenURL as any).mockResolvedValue(false);
      const result = await whatsappService.isWhatsAppInstalled();
      expect(result).toBe(false);
    });
  });

  describe('formatPhoneNumber', () => {
    it('should remove non-numeric characters', () => {
      expect(whatsappService.formatPhoneNumber('(11) 99999-8888')).toBe('5511999998888');
    });

    it('should remove leading zero', () => {
      expect(whatsappService.formatPhoneNumber('011999998888')).toBe('5511999998888');
    });

    it('should add Brazil country code (55) if not present', () => {
      expect(whatsappService.formatPhoneNumber('11999998888')).toBe('5511999998888');
    });

    it('should not add country code if already present (long string)', () => {
      expect(whatsappService.formatPhoneNumber('5511999998888')).toBe('5511999998888');
    });
  });

  describe('sendMessage', () => {
    it('should show alert if WhatsApp is not installed', async () => {
      (Linking.canOpenURL as any).mockResolvedValue(false);
      
      const result = await whatsappService.sendMessage('11999998888', 'Hello');
      
      expect(result).toBe(false);
      expect(Alert.alert).toHaveBeenCalledWith(
        'WhatsApp não encontrado',
        expect.any(String),
        expect.any(Array)
      );
    });

    it('should open WhatsApp with formatted number and encoded message', async () => {
      (Linking.canOpenURL as any).mockResolvedValue(true);
      
      const result = await whatsappService.sendMessage('11999998888', 'Olá Mundo');
      
      expect(result).toBe(true);
      expect(Linking.openURL).toHaveBeenCalledWith(
        expect.stringContaining('whatsapp://send?phone=5511999998888&text=Ol%C3%A1%20Mundo')
      );
    });
  });

  describe('openWhatsApp', () => {
    it('should open WhatsApp base URL if installed', async () => {
      (Linking.canOpenURL as any).mockResolvedValue(true);
      await whatsappService.openWhatsApp();
      expect(Linking.openURL).toHaveBeenCalledWith('whatsapp://');
    });

    it('should show alert if not installed when trying to open', async () => {
      (Linking.canOpenURL as any).mockResolvedValue(false);
      await whatsappService.openWhatsApp();
      expect(Alert.alert).toHaveBeenCalledWith('WhatsApp não encontrado', expect.any(String), expect.any(Array));
    });
  });
});