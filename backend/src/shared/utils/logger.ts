type TMeta = Record<string, any>;
type logType = 'info' | 'warn' | 'error';
type logFn = (message: string, meta?: TMeta) => void;

function formatMessage(type: logType, message: string, meta?: TMeta) {
  const timestamp = new Date();
  const metaString = meta ? `| ${JSON.stringify(meta)}` : '';

  const year = String(timestamp.getFullYear()).slice(-2);
  const month = String(timestamp.getMonth() + 1).padStart(2, '0');
  const day = String(timestamp.getDate()).padStart(2, '0');

  const hours = String(timestamp.getHours()).padStart(2, '0');
  const minutes = String(timestamp.getMinutes()).padStart(2, '0');
  const seconds = String(timestamp.getSeconds()).padStart(2, '0');

  return `[${type.toUpperCase()}] ${year}.${month}.${day}, ${hours}:${minutes}:${seconds} ${message}${metaString}`;
}

export const logger: Record<logType, logFn> = {
  info: (message, meta) => console.info(formatMessage('info', message, meta)),
  warn: (message, meta) => console.warn(formatMessage('warn', message, meta)),
  error: (message, meta) => console.error(formatMessage('error', message, meta)),
};
