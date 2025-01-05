import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

interface DateTimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DateTimePicker: React.FC<DateTimePickerProps> = ({ date, setDate }) => {
  const generateTimeOptions = (): string[] => {
    const options: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newDate = new Date(date);
    newDate.setDate(parseInt(e.target.value));
    setDate(newDate);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newDate = new Date(date);
    newDate.setMonth(parseInt(e.target.value));
    setDate(newDate);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newDate = new Date(date);
    newDate.setFullYear(parseInt(e.target.value));
    setDate(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setDate(newDate);
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hours}:${minutes}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal bg-dark-2 text-white",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? formatDate(date) : <span>Pick a date and time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 text-white">
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-2">
            <select
              className="bg-dark-2 rounded p-2"
              value={date.getMonth()}
              onChange={handleMonthChange}
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            
            <select
              className="bg-dark-2 rounded p-2"
              value={date.getDate()}
              onChange={handleDateChange}
            >
              {Array.from(
                { length: getDaysInMonth(date.getFullYear(), date.getMonth()) },
                (_, i) => i + 1
              ).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            
            <select
              className="bg-dark-2 rounded p-2"
              value={date.getFullYear()}
              onChange={handleYearChange}
            >
              {Array.from(
                { length: 10 },
                (_, i) => new Date().getFullYear() + i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <select
            className="bg-dark-2 rounded p-2"
            value={`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}
            onChange={handleTimeChange}
          >
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePicker;