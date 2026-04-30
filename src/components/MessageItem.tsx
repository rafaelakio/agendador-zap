import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Card, Text, IconButton, Chip } from 'react-native-paper';
import { ScheduledMessage } from '../types';
import { dateUtils } from '../utils/dateUtils';

interface MessageItemProps {
  message: ScheduledMessage;
  onPress: () => void;
  onDelete: () => void;
  onSend: () => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  message,
  onPress,
  onDelete,
  onSend,
}) => {
  const isPending = message.status === 'pending';
  const isSent = message.status === 'sent';
  const isFailed = message.status === 'failed';
  const isPast = dateUtils.isPast(message.scheduledDate);

  const getStatusColor = () => {
    if (isSent) return '#4CAF50';
    if (isFailed) return '#F44336';
    if (isPast && isPending) return '#FF9800';
    return '#2196F3';
  };

  const getStatusText = () => {
    if (isSent) return 'Enviada';
    if (isFailed) return 'Falhou';
    if (isPast && isPending) return 'Atrasada';
    return 'Agendada';
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir Mensagem',
      'Tem certeza que deseja excluir esta mensagem agendada?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: onDelete },
      ]
    );
  };

  const handleSend = () => {
    Alert.alert(
      'Enviar Agora',
      'Deseja enviar esta mensagem agora?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', onPress: onSend },
      ]
    );
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <View style={styles.contactInfo}>
            <Text variant="titleMedium" style={styles.contactName}>
              📱 {message.contactName}
            </Text>
            <Chip
              mode="flat"
              style={[styles.statusChip, { backgroundColor: getStatusColor() + '20' }]}
              textStyle={{ color: getStatusColor(), fontSize: 12 }}
            >
              {getStatusText()}
            </Chip>
          </View>
          <View style={styles.actions}>
            {isPending && (
              <IconButton
                icon="send"
                size={20}
                onPress={handleSend}
                iconColor="#2196F3"
              />
            )}
            <IconButton
              icon="delete"
              size={20}
              onPress={handleDelete}
              iconColor="#F44336"
            />
          </View>
        </View>

        <Text variant="bodyMedium" style={styles.message} numberOfLines={2}>
          {message.message}
        </Text>

        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.dateTime}>
            ⏰ {dateUtils.getRelativeDate(message.scheduledDate)}
          </Text>
          {isSent && message.sentAt && (
            <Text variant="bodySmall" style={styles.sentAt}>
              ✓ Enviada em {dateUtils.formatDateTime(message.sentAt)}
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  contactInfo: {
    flex: 1,
    gap: 4,
  },
  contactName: {
    fontWeight: 'bold',
  },
  statusChip: {
    alignSelf: 'flex-start',
    height: 24,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  message: {
    marginVertical: 8,
    color: '#666',
  },
  footer: {
    marginTop: 8,
    gap: 4,
  },
  dateTime: {
    color: '#2196F3',
    fontWeight: '500',
  },
  sentAt: {
    color: '#4CAF50',
    fontSize: 11,
  },
});

// Made with Bob
