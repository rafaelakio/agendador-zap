export interface ScheduledMessage {
  id: string;
  contactName: string;
  contactPhone: string;
  message: string;
  scheduledDate: Date;
  status: 'pending' | 'sent' | 'failed';
  createdAt: Date;
  sentAt?: Date;
}

export interface Contact {
  recordID: string;
  displayName: string;
  phoneNumbers: Array<{
    label: string;
    number: string;
  }>;
}

export type RootStackParamList = {
  Home: undefined;
  AddMessage: { message?: ScheduledMessage };
};

// Made with Bob
