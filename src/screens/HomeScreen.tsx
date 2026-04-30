import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useMessages } from '../contexts/MessagesContext';
import { MessageItem } from '../components/MessageItem';
import { FloatingButton } from '../components/FloatingButton';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { messages, loading, deleteMessage, sendMessage, refreshMessages } = useMessages();
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    refreshMessages();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshMessages();
    setRefreshing(false);
  };

  const handleAddMessage = () => {
    navigation.navigate('AddMessage', {});
  };

  const handleMessagePress = (messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      navigation.navigate('AddMessage', { message });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleSendMessage = async (messageId: string) => {
    try {
      const message = messages.find(msg => msg.id === messageId);
      if (message) {
        await sendMessage(message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const sortedMessages = [...messages].sort((a, b) => {
    // Pending messages first, sorted by scheduled date
    if (a.status === 'pending' && b.status !== 'pending') return -1;
    if (a.status !== 'pending' && b.status === 'pending') return 1;
    return b.scheduledDate.getTime() - a.scheduledDate.getTime();
  });

  if (loading && messages.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando mensagens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={styles.emptyTitle}>
            Nenhuma mensagem agendada
          </Text>
          <Text variant="bodyMedium" style={styles.emptyText}>
            Toque no botão + para agendar sua primeira mensagem
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedMessages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageItem
              message={item}
              onPress={() => handleMessagePress(item.id)}
              onDelete={() => handleDeleteMessage(item.id)}
              onSend={() => handleSendMessage(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}

      <FloatingButton onPress={handleAddMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: 8,
    paddingBottom: 80,
  },
});

// Made with Bob
