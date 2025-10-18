import type { PropsWithChildren } from 'react';

export function Title({ children }: PropsWithChildren) {
  return <h2 className='text-sm'>{children}</h2>;
}
