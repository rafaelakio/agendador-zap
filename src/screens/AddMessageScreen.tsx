import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useMessages } from '../contexts/MessagesContext';
import { ContactPicker } from '../components/ContactPicker';
import { DateTimePicker } from '../components/DateTimePicker';

type AddMessageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddMessage'>;
type AddMessageScreenRouteProp = RouteProp<RootStackParamList, 'AddMessage'>;

export const AddMessageScreen: React.FC = () => {
  const navigation = useNavigation<AddMessageScreenNavigationProp>();
  const route = useRoute<AddMessageScreenRouteProp>();
  const { addMessage, updateMessage } = useMessages();

  const editingMessage = route.params?.message;
  const isEditing = !!editingMessage;

  const [contactName, setContactName] = useState(editingMessage?.contactName || '');
  const [contactPhone, setContactPhone] = useState(editingMessage?.contactPhone || '');
  const [message, setMessage] = useState(editingMessage?.message || '');
  const [scheduledDate, setScheduledDate] = useState(
    editingMessage?.scheduledDate || new Date(Date.now() + 60000) // Default: 1 minute from now
  );
  const [loading, setLoading] = useState(false);

  const handleSelectContact = (name: string, phone: string) => {
    setContactName(name);
    setContactPhone(phone);
  };

  const validateForm = (): boolean => {
    if (!contactName.trim()) {
      Alert.alert('Erro', 'Por favor, selecione um contato.');
      return false;
    }

    if (!contactPhone.trim()) {
      Alert.alert('Erro', 'O contato selecionado não possui número de telefone.');
      return false;
    }

    if (!message.trim()) {
      Alert.alert('Erro', 'Por favor, digite uma mensagem.');
      return false;
    }

    if (scheduledDate <= new Date()) {
      Alert.alert('Erro', 'A data e hora devem ser no futuro.');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (isEditing && editingMessage) {
        await updateMessage(editingMessage.id, {
          contactName,
          contactPhone,
          message,
          scheduledDate,
        });
        Alert.alert('Sucesso', 'Mensagem atualizada com sucesso!');
      } else {
        await addMessage({
          contactName,
          contactPhone,
          message,
          scheduledDate,
          status: 'pending',
        });
        Alert.alert('Sucesso', 'Mensagem agendada com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving message:', error);
      Alert.alert('Erro', 'Não foi possível salvar a mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleCancel} />
        <Appbar.Content title={isEditing ? 'Editar Mensagem' : 'Nova Mensagem'} />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <Text variant="labelLarge" style={styles.sectionTitle}>
            Destinatário
          </Text>
          <ContactPicker
            onSelectContact={handleSelectContact}
            selectedContact={contactName}
          />

          {contactPhone ? (
            <Text variant="bodySmall" style={styles.phoneNumber}>
              📱 {contactPhone}
            </Text>
          ) : null}

          <Text variant="labelLarge" style={styles.sectionTitle}>
            Mensagem
          </Text>
          <TextInput
            mode="outlined"
            placeholder="Digite sua mensagem..."
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={6}
            style={styles.messageInput}
            maxLength={1000}
          />
          <Text variant="bodySmall" style={styles.charCount}>
            {message.length}/1000 caracteres
          </Text>

          <DateTimePicker
            value={scheduledDate}
            onChange={setScheduledDate}
            minimumDate={new Date()}
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={handleCancel}
              style={styles.button}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              {isEditing ? 'Atualizar' : 'Agendar'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  phoneNumber: {
    marginTop: 4,
    color: '#666',
  },
  messageInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 32,
  },
  button: {
    flex: 1,
  },
});

// Made with Bob
