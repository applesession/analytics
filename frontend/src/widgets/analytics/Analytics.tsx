import { Conversions, Quality, DateMock, ChatMock } from './ui';

export function Analytics() {
  return (
    <div className='flex-1 overflow-auto grid grid-cols-[2fr_1fr] grid-rows-2 gap-6'>
      <Conversions />
      <Quality />
      <DateMock />
      <ChatMock />
    </div>
  );
}
