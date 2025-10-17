import z from 'zod';

const toNullableNumber = (v: unknown) => {
  if (v === '' || v === undefined || v === null) return null;
  if (typeof v === 'string' && v.trim() === '') return null;
  if (typeof v === 'string') return Number(v);
  return v;
};

export const makeOptionalPositiveIntNullable = (message: string) =>
  z.preprocess(
    toNullableNumber,
    z.union([
      z.null(),
      z
        .number({ error: message })
        .refine((n) => Number.isFinite(n), { message })
        .int({ message })
        .min(1, { message }),
    ]),
  );

export const makePositiveInt = (message: string) =>
  z.preprocess(
    (input) => (!input ? undefined : input),
    z.coerce
      .number({
        error: (issue) => {
          if (issue.code === 'invalid_type') return message;
          return issue.message;
        },
      })
      .int({ message })
      .positive({ message }),
  );
// z
//   .union([z.number(), z.string(), z.undefined()])
//   .transform((v) => Number(v))
//   .refine((n) => !isNaN(n), { message }) // 숫자로 변환 가능한지 확인
//   .refine((n) => Number.isInteger(n) && n > 0, { message });
