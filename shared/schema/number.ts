import z from 'zod';

const toNullableNumber = (v: unknown) => {
  if (v === '' || v === undefined || v === null) return null;
  if (typeof v === 'string' && v.trim() === '') return null;
  if (typeof v === 'string') return Number(v);
  return v;
};

export const makeOptionalPositiveIntNullable = (message: string) =>
  z
    .union([z.string(), z.number(), z.null(), z.undefined()])
    .transform((v) => {
      if (v === '' || v === null || v === undefined) return null;
      const n = typeof v === 'string' ? Number(v) : v;
      return n;
    })
    .pipe(
      z.union([
        z.null(),
        z
          .number({
            error: (issue) => {
              if (issue.code === 'invalid_type') return message;
              return issue.message;
            },
          })
          .refine((n) => Number.isFinite(n), { message })
          .int({ message })
          .min(1, { message }),
      ]),
    );
// z.preprocess(
//   toNullableNumber,
//   z.union([
//     z.null(),
//     z
//       .number({ error: message })
//       .refine((n) => Number.isFinite(n), { message })
//       .int({ message })
//       .min(1, { message }),
//   ]),
// );

export const makePositiveInt = (message: string) =>
  // z
  //   .preprocess(
  //     (val) => {
  //       if (
  //         val === null ||
  //         val === undefined ||
  //         (typeof val === 'string' && val.trim() === '')
  //       ) {
  //         return null;
  //       }
  //       return val;
  //     },
  //     z.coerce
  //       .number({
  //         error: (issue) => {
  //           if (issue.code === 'invalid_type') return message;
  //           return issue.message;
  //         },
  //       })
  //       .int({ message })
  //       .min(1, { message })
  //       .positive({ message }),
  //   )
  //   .pipe(z.number());

  z
    .union([z.string(), z.number(), z.null()])
    .transform((v) => {
      if (v === '' || v === null || v === undefined) return null;
      if (typeof v === 'string') {
        if (!v.trim()) return null;
        return Number(v);
      }
      return v;
    })
    .pipe(
      z
        .number({
          error: (issue) => {
            if (issue.code === 'invalid_type') return message;
            return issue.message;
          },
        })
        .refine((n) => Number.isFinite(n), { message })
        .int({ message })
        .min(1, { message })
        .positive({ message }), // >= 1
    );

// z.preprocess(
//   (input) => (!input ? undefined : input),
//   z.coerce
//     .number({
//       error: (issue) => {
//         if (issue.code === 'invalid_type') return message;
//         return issue.message;
//       },
//     })
//     .int({ message })
//     .positive({ message }),
// );

// z
//   .union([z.number(), z.string(), z.undefined()])
//   .transform((v) => Number(v))
//   .refine((n) => !isNaN(n), { message }) // 숫자로 변환 가능한지 확인
//   .refine((n) => Number.isInteger(n) && n > 0, { message });
