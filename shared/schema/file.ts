import { z } from 'zod';
import { EXCEL_VALID_EXTENSIONS } from '../constants';

export const excelFileTypeSchema = z.any().superRefine((file, ctx) => {
  if (!file || !(file instanceof File)) {
    ctx.addIssue({
      code: 'custom',
      message: '업로드 할 파일을 선택해주세요.',
    });
    return;
  }

  const fileName = file?.name.toLowerCase();
  if (
    !EXCEL_VALID_EXTENSIONS.some((extension) => fileName.endsWith(extension))
  ) {
    ctx.addIssue({
      code: 'custom',
      message: '엑셀파일만 업로드가 가능합니다.',
    });
    return;
  }
});