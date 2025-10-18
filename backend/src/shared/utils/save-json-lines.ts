import fs from 'fs';
import path from 'path';

export async function saveJsonLines(data: any[], fileName: string) {
  const filePath = path.resolve(process.cwd(), `assets/${fileName}.jsonl`);
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

  const lines = data.map((obj) => JSON.stringify(obj)).join('\n') + '\n';
  await fs.promises.writeFile(filePath, lines, 'utf8');

  return filePath;
}
