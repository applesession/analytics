import { Tooltip as TooltipUI } from 'recharts';

export function Tooltip() {
  return (
    <TooltipUI
      contentStyle={{
        backgroundColor: 'var(--color-secondary)',
        border: 'none',
        borderRadius: '8px',
      }}
      itemStyle={{ color: 'var(--color-foreground)' }}
    />
  );
}
