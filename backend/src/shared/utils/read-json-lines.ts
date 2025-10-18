import { createInterface } from 'readline';
import { Readable } from 'stream';

export async function* readJsonLines(stream: Readable) {
  const lines = createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of lines) {
    try {
      yield JSON.parse(line);
    } catch (error) {
      console.warn('Invalid JSON line', error);
    }
  }
}
