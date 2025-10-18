import type { PropsWithChildren } from 'react';

export function Section({ children }: PropsWithChildren) {
  return <section className='bg-primary p-4 rounded-lg space-y-2'>{children}</section>;
}
