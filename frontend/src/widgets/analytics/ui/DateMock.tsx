import { XAxis, ResponsiveContainer, Bar, BarChart, Cell } from 'recharts';
import { Section, Title, Tooltip } from '@/shared/ui';
import { dates } from '@/shared/mocks';

export function DateMock() {
  return (
    <Section>
      <Title>Mock Data</Title>

      <ResponsiveContainer
        width='100%'
        height='90%'
      >
        <BarChart
          data={dates}
          barSize={36}
        >
          <XAxis
            dataKey='date'
            stroke='var(--muted)'
            tickLine={false}
            axisLine={false}
          />
          <Tooltip />
          <Bar
            dataKey='value'
            radius={[6, 6, 0, 0]}
          >
            {dates.map((entry, index) => (
              <Cell
                key={index}
                className={`${entry.date === '09.06' ? 'fill-accent' : 'fill-muted'}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Section>
  );
}
