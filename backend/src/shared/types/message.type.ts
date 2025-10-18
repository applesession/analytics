export interface IMessage {
  id: number;
  chatbot_id: number;
  role: 'bot' | 'human' | 'tool';
  message: string | number | object;
  created_at: string;
  meta: IDialogMeta;
  source: string;
  conversation_id: string;
}

interface IDialogMeta {
  created_at: any;
  channel_type?: string;
  clients_phone?: string;
  original_request?: string;
}

export type IMessageLite = Omit<IMessage, 'meta' | 'source' | 'chatbot_id'>;

export type IDialogMessages = Record<IMessage['conversation_id'], IMessageLite[]>;
