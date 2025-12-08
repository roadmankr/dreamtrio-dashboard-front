import dayjs from '@/lib/dayjs';
import { DATE_FORMAT } from '@/shared/date/constants';

import z from 'zod';

export const makeDateSchema = (format: string = DATE_FORMAT) =>
  z
    .union([z.string(), z.date()])
    .transform((v) => dayjs(v).toDate())
    .pipe(
      z.date({
        error: (issue) => {
          if (issue.code === 'invalid_type') return '유효하지 않은 날짜입니다.';
          return issue.message;
        },
      }),
    )
    .transform((d) => dayjs(d).format(format));
// z
//   .union([z.string(), z.date()])
//   .transform((v) => dayjs(v).toDate())
//   .pipe(
//     z.date({
//       error: (issue) => {
//         if (issue.code === 'invalid_type') return '유효하지 않은 날짜입니다.';
//         return issue.message;
//       },
//     }),
//   )
//   .transform((d) => dayjs(d).format(format));
// z.coerce
//   .date()
//   .refine((v) => dayjs(v).isValid(), { message: '유효하지 않은 날짜입니다.' })
//   .transform((v) => dayjs(v).format(format));

export const fullDateSchema = makeDateSchema(DATE_FORMAT);
export const fullDateSlashSchema = makeDateSchema('YYYY/MM/DD');
export const yearMonthDateSchema = makeDateSchema('YYYY-MM');
