import { useState } from 'react';

const DATE_OPTIONS = ['1d', '7d', '30d'] as const;
type DateOption = (typeof DATE_OPTIONS)[number];

interface ActivityDateSelectorProps {
  onChange: (start: Date, end: Date) => void;
}

export function ActivityDateSelector({ onChange }: ActivityDateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<DateOption | null>(null);

  const handleSelect = (date: DateOption) => {
    setSelectedDate(date);

    const end = new Date();
    let start = new Date();

    switch (date) {
      case '1d':
        start.setDate(end.getDate() - 1);
        break;
      case '7d':
        start.setDate(end.getDate() - 7);
        break;
      case '30d':
        start.setDate(end.getDate() - 30);
        break;
      default:
        start = new Date(end);
    }

    onChange?.(start, end);
  };

  return (
    <ul className='grid grid-cols-3 gap-4 text-center'>
      {DATE_OPTIONS.map((date) => (
        <li
          key={date}
          className={`py-1 px-2 rounded-lg cursor-pointer transition-all ${
            selectedDate === date ? 'bg-secondary text-black' : ' text-muted'
          } hover:bg-secondary`}
          onClick={() => handleSelect(date)}
        >
          {date}
        </li>
      ))}
    </ul>
  );
}
