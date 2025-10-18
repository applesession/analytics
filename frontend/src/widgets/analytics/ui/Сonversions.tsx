import { ResponsiveContainer, XAxis, Bar, YAxis, BarChart, LabelList } from 'recharts';
import { Title, Section, ActivityDateSelector, Tooltip } from '@/shared/ui';
import { useGetConvesionMetrics } from '@/features/conversion';
import { useState } from 'react';
import { transformConversionData } from '@/shared/utils';

export function Conversions() {
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());

  const { data, isLoading } = useGetConvesionMetrics(startTime, endTime);
  const transformed = transformConversionData(data);

  return (
    <Section>
      <div className='flex justify-between items-center'>
        <Title>Conversion</Title>
        <ActivityDateSelector
          onChange={(start, end) => {
            setStartTime(start);
            setEndTime(end);
          }}
        />
      </div>

      {!isLoading && (
        <ResponsiveContainer>
          <BarChart
            data={transformed}
            layout='vertical'
            margin={{ top: 20, right: 50, left: 100, bottom: 40 }}
          >
            <XAxis
              type='number'
              stroke='var(--color-foreground)'
              tick={{ fill: 'var(--color-muted)' }}
            />
            <YAxis
              dataKey='stage'
              type='category'
              className='text-sm'
            />
            <Tooltip />
            <Bar
              className='fill-accent'
              dataKey='count'
              barSize={36}
              radius={[0, 6, 6, 0]}
            >
              <LabelList
                dataKey='count'
                position='right'
                className='fill-accent font-bold'
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Section>
  );
}
