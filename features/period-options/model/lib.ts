import dayjs from '@/lib/dayjs';
import { SelectOption } from '@/shared/types/form';

export function getMonthOptions() {
  const start = dayjs('2025-05'); // 시작점
  const end = dayjs(); // 현재 달
  const options: SelectOption[] = [];

  let cursor = end.endOf('month');
  while (cursor.isAfter(start) || cursor.isSame(start, 'month')) {
    const value = cursor.format('YYYY-MM');
    options.push({ label: value, value });
    cursor = cursor.subtract(1, 'month');
  }

  return options;
}
