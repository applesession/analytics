import type { LucideIcon, LucideProps } from 'lucide-react';

interface Props extends LucideProps {
  icon: LucideIcon;
}

export function Icon({ icon: Icon, ...props }: Props) {
  return <Icon {...props} />;
}
