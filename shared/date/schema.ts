import dayjs from '@/lib/dayjs';
import { DATE_FORMAT } from '@/shared/date/constants';
import z from 'zod';

export const makeDateSchema = (format: string = DATE_FORMAT) =>
  z.coerce
    .date()
    .refine((v) => dayjs(v).isValid(), { message: '유효하지 않은 날짜입니다.' })
    .transform((v) => dayjs(v).format(format));

export const fullDateSchema = makeDateSchema(DATE_FORMAT);
