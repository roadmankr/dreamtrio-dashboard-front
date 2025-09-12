import { z } from 'zod';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB 예시
// const MAX_FILE_BYTES = 1; // 10MB 예시
const ALLOWED_MIME = new Set([
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

export const excelFileTypeSchema = z.any().superRefine((file, ctx) => {
  if (!file || !(file instanceof File)) {
    ctx.addIssue({
      code: 'custom',
      message: '업로드 할 파일을 선택해주세요.',
    });
    return;
  }

  if (!ALLOWED_MIME.has(file.type)) {
    ctx.addIssue({
      code: 'custom',
      message: '엑셀파일만 업로드가 가능합니다.',
    });
    return;
  }

  if (!(file instanceof File) || file.size === 0) {
    ctx.addIssue({
      code: 'custom',
      message: '파일이 없습니다.',
    });
    return;
  }

  if (file.size > MAX_FILE_BYTES) {
    ctx.addIssue({
      code: 'custom',
      message: '파일 용량이 너무 큽니다(최대10MB)',
    });
    return;
  }
});
