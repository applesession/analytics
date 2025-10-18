import { m } from 'framer-motion';
import { ActivityDateSelector, Section, Title } from '@/shared/ui';
import { listVariants, listItemVariants } from '@/shared/configs';
import { useGetQualityMetrics } from '@/features/quality';
import { transformQualityData } from '@/shared/utils';
import { useState } from 'react';

export function Quality() {
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());

  const { data, isLoading } = useGetQualityMetrics(startTime, endTime);
  const transformed = transformQualityData(data);

  return (
    <Section>
      <div className='flex justify-between items-center'>
        <Title>Quality</Title>
        <ActivityDateSelector
          onChange={(start, end) => {
            setStartTime(start);
            setEndTime(end);
          }}
        />
      </div>

      {!isLoading && (
        <m.ul
          className='grid grid-cols-2 grid-rows-2 gap-2'
          variants={listVariants}
          initial='hidden'
          animate='visible'
        >
          {transformed.map(({ value, name, type }) => (
            <m.li
              key={name}
              variants={listItemVariants}
              className='flex flex-col bg-secondary rounded-lg p-2 gap-2 cursor-pointer'
            >
              <span className='text-sm text-muted'>{name}</span>
              <div className='flex items-baseline gap-2'>
                <h3 className='text-4xl font-semibold'>{value}</h3>
                {type === 'percent' && <span className='text-lg text-muted'>/ 100%</span>}
              </div>
            </m.li>
          ))}
        </m.ul>
      )}
    </Section>
  );
}
