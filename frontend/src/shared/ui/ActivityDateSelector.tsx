import { useState } from 'react';

const DATE_OPTIONS = ['1d', '7d', '30d'] as const;
type DateOption = (typeof DATE_OPTIONS)[number];

interface ActivityDateSelectorProps {
  onChange?: (date: DateOption) => void;
}

export function ActivityDateSelector({ onChange }: ActivityDateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<DateOption>('1d');

  const handleSelect = (date: DateOption) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  return (
    <ul className='grid grid-cols-3 gap-4 text-center'>
      {DATE_OPTIONS.map((date) => (
        <li
          key={date}
          className={`py-1 px-2 rounded-lg cursor-pointer transition-all ${
            selectedDate === date ? 'bg-secondary text-black' : ' text-muted'
          }
            hover:bg-secondary`}
          onClick={() => handleSelect(date)}
        >
          {date}
        </li>
      ))}
    </ul>
  );
}
