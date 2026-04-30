import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { MessagesProvider, useMessages } from '../MessagesContext';
import { storageService } from '../../services/storageService';
import { notificationService } from '../../services/notificationService';

vi.mock('../../services/storageService', () => ({
  storageService: {
    getMessages: vi.fn().mockResolvedValue([]),
    addMessage: vi.fn().mockResolvedValue(null),
    updateMessage: vi.fn().mockResolvedValue(null),
    deleteMessage: vi.fn().mockResolvedValue(null),
  },
}));

vi.mock('../../services/notificationService', () => ({
  notificationService: {
    scheduleNotification: vi.fn().mockResolvedValue(null),
    cancelNotification: vi.fn().mockResolvedValue(null),
    requestPermission: vi.fn().mockResolvedValue(true),
  },
}));

vi.mock('../../services/whatsappService', () => ({
  whatsappService: {
    sendMessage: vi.fn().mockResolvedValue(true),
  },
}));

describe('MessagesContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MessagesProvider>{children}</MessagesProvider>
  );

  it('should load messages from storage on mount', async () => {
    const mockMessages = [{ id: '1', message: 'Test', status: 'pending' }];
    (storageService.getMessages as any).mockResolvedValue(mockMessages);

    const { result } = renderHook(() => useMessages(), { wrapper });

    // Aguarda o useEffect carregar as mensagens
    await act(async () => {});

    expect(result.current.messages).toEqual(mockMessages);
    expect(storageService.getMessages).toHaveBeenCalled();
  });

  it('should add a new message and schedule notification', async () => {
    const { result } = renderHook(() => useMessages(), { wrapper });

    const newMessage = {
      contactName: 'Bob',
      contactPhone: '11999999999',
      message: 'Hello!',
      scheduledDate: new Date(),
    };

    await act(async () => {
      await result.current.addMessage(newMessage);
    });

    expect(result.current.messages.length).toBe(1);
    expect(storageService.addMessage).toHaveBeenCalled();
    expect(notificationService.scheduleNotification).toHaveBeenCalled();
  });

  it('should delete a message and cancel its notification', async () => {
    const mockMessages = [{ id: '123', message: 'Delete me', status: 'pending' }];
    (storageService.getMessages as any).mockResolvedValue(mockMessages);

    const { result } = renderHook(() => useMessages(), { wrapper });
    await act(async () => {}); // load

    await act(async () => {
      await result.current.deleteMessage('123');
    });

    expect(result.current.messages.length).toBe(0);
    expect(notificationService.cancelNotification).toHaveBeenCalledWith('123');
  });
});