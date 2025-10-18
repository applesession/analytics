import { m } from 'framer-motion';
import { Section, Title } from '@/shared/ui';
import { listVariants, listItemVariants } from '@/shared/configs';
import { updates } from '@/shared/mocks';

export function ChatMock() {
  return (
    <Section>
      <Title>Updates & News</Title>

      <m.ul
        variants={listVariants}
        initial='hidden'
        animate='visible'
        className='space-y-2'
      >
        {updates.map((item, index) => (
          <m.li
            key={index}
            variants={listItemVariants}
            whileHover={{ scale: 0.95 }}
            className='space-y-2 bg-secondary p-2 rounded-lg cursor-pointer'
          >
            <div className='text-muted text-sm'>{item.time}</div>
            <div>{item.title}</div>
            <div className='text-muted text-sm'>{item.category}</div>
          </m.li>
        ))}
      </m.ul>
    </Section>
  );
}
