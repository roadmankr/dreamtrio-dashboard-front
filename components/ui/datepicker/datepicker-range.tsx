'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import dayjs from '@/lib/dayjs';
import { cn } from '@/lib/utils';
import { DATE_FORMAT } from '@/shared/date/constants';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

interface Props {
  startDate?: string;
  endDate?: string;
  onSelect?: ({ from, to }: { from: Date; to: Date }) => void;
  className?: string;
}

export function DatePickerWithRange({
  className,
  startDate,
  endDate,
  onSelect,
}: Props) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const from = React.useMemo(
    () => startDate ?? dayjs().subtract(7, 'day').format(DATE_FORMAT),
    [startDate],
  );
  const to = React.useMemo(
    () => endDate ?? dayjs().format(DATE_FORMAT),
    [endDate],
  );
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(from),
    to: new Date(to),
  });

  // React.useEffect(() => {
  //   const fromDate = new Date(from);
  //   const toDate = new Date(to);
  //   if (!dayjs(date.from).isSame(fromDate) || !dayjs(date.to).isSame(toDate)) {
  //     setDate({ from: fromDate, to: toDate });
  //   }
  // }, [from, to]);
  const commit = React.useCallback(
    (from: Date, to: Date) => {
      onSelect?.({ from, to });
      queueMicrotask(() => setCalendarOpen(false));
    },
    [onSelect],
  );

  React.useEffect(() => {
    if (!calendarOpen && !date.to && date.from) {
      setDate((date) => ({ ...date, to: new Date() }));
      commit(date.from, new Date());
    }
  }, [calendarOpen, date.to, endDate, date.from, onSelect]);

  const handleDate = (d: DateRange | undefined) => {
    if (date.from && date.to) {
      setDate(() => ({
        to: undefined,
        from: dayjs(date.from).isSame(d?.from) ? d?.to : d?.from,
      }));
      return;
    }

    const from = dayjs(d?.from).isBefore(d?.to) ? d?.from : d?.to;
    const to = dayjs(d?.from).isBefore(d?.to) ? d?.to : d?.from;

    setDate({ from, to });
    if (from && to) commit(from, to);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'h-10 w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            <div className='flex w-full items-center justify-between truncate'>
              {date?.from ? (
                <div className='flex w-full gap-2 truncate'>
                  <span>{dayjs(date.from).format('YYYY/MM/DD')}</span>
                  <span>-</span>
                  <span>
                    {date.to ? dayjs(date.to).format('YYYY/MM/DD') : ' '}
                  </span>
                </div>
              ) : (
                <span>Pick a date</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            locale={ko}
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDate}
            numberOfMonths={2}
            disabled={{
              before: date.from && !date.to ? new Date(date.from) : undefined,
              after: new Date(),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
