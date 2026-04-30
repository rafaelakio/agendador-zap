import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Modal } from 'react-native';
import { Button, TextInput, List, Divider, Text, IconButton } from 'react-native-paper';
import { permissionService } from '../services/permissionService';
import { Contact } from '../types';

interface ContactPickerProps {
  onSelectContact: (name: string, phone: string) => void;
  selectedContact?: string;
}

export const ContactPicker: React.FC<ContactPickerProps> = ({
  onSelectContact,
  selectedContact,
}) => {
  const [visible, setVisible] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const loadedContacts = await permissionService.getContacts();
      setContacts(loadedContacts);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = async () => {
    setVisible(true);
    await loadContacts();
  };

  const handleClose = () => {
    setVisible(false);
    setSearchQuery('');
  };

  const handleSelectContact = (contact: Contact) => {
    const phone = contact.phoneNumbers[0]?.number || '';
    onSelectContact(contact.displayName, phone);
    handleClose();
  };

  const filteredContacts = contacts.filter(contact =>
    contact.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        onPress={handleOpen}
        icon="account"
        style={styles.button}
      >
        {selectedContact || 'Selecionar Contato'}
      </Button>

      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.title}>
              Selecionar Contato
            </Text>
            <IconButton icon="close" onPress={handleClose} />
          </View>

          <TextInput
            mode="outlined"
            placeholder="Buscar contato..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            left={<TextInput.Icon icon="magnify" />}
          />

          {loading ? (
            <View style={styles.centerContainer}>
              <Text>Carregando contatos...</Text>
            </View>
          ) : filteredContacts.length === 0 ? (
            <View style={styles.centerContainer}>
              <Text>Nenhum contato encontrado</Text>
            </View>
          ) : (
            <FlatList
              data={filteredContacts}
              keyExtractor={item => item.recordID}
              renderItem={({ item }) => (
                <>
                  <List.Item
                    title={item.displayName}
                    description={item.phoneNumbers[0]?.number}
                    left={props => <List.Icon {...props} icon="account" />}
                    onPress={() => handleSelectContact(item)}
                  />
                  <Divider />
                </>
              )}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  button: {
    justifyContent: 'flex-start',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  searchInput: {
    margin: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Made with Bob
