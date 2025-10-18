import { IMessage, IMessageLite, IDialogMessages } from '@/shared/types/message.type';
import fs from 'fs';
import path from 'path';

class MessageService {
  // note: имитирую метод, который запрашивает необработанные данные с БД другого сервера
  async getMessages() {
    const fileName = path.resolve(process.cwd(), 'assets/messages.json');
    const rawMessages = await fs.promises.readFile(fileName, 'utf-8');

    return this.normalizeMessages(JSON.parse(rawMessages));
  }

  groupAndSortMessages(messages: IMessageLite[]) {
    const grouped = messages.reduce<IDialogMessages>((acc, data) => {
      const { conversation_id } = data;
      if (!acc[conversation_id]) acc[conversation_id] = [];
      acc[conversation_id].push(data);
      return acc;
    }, {});

    for (const id in grouped) {
      grouped[id].sort((a, b) => a.created_at.localeCompare(b.created_at));
    }

    return grouped;
  }

  private normalizeMessages(messages: IMessage[]): IMessageLite[] {
    return messages
      .filter(({ role, message }) => role !== 'tool' && typeof message !== 'object')
      .map(({ id, message, conversation_id, role, created_at }) => ({
        id,
        message: String(message),
        conversation_id,
        role,
        created_at,
      }));
  }
}

export const messageService = new MessageService();
