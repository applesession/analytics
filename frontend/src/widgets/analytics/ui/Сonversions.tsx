import { ResponsiveContainer, XAxis, Bar, YAxis, BarChart, LabelList } from 'recharts';
import { Title, Section, ActivityDateSelector, Tooltip } from '@/shared/ui';
import { useGetMetrics } from '@/features/conversion';

export function Conversions() {
  const { data, isLoading } = useGetMetrics('2020-01-01T00:00:00.000Z', '2030-12-31T23:59:59.999Z');
  const readyData = Object.entries(data.counters).map(([key, value]) => ({
    stage: key,
    count: value,
  }));

  return (
    <Section>
      <div className='flex justify-between items-center'>
        <Title>Conversion</Title>
        <ActivityDateSelector />
      </div>

      {!isLoading && (
        <ResponsiveContainer>
          <BarChart
            data={readyData}
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
