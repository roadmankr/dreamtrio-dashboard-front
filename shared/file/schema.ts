import { z } from 'zod';
import { allowedMimeByFileTypeConfig, FileTypeMap } from '../model/file';

const MAX_FILE_BYTES = 10 * 1024 * 1024;

type FileRule = {
  label: string; // 에러메시지에 표시할 라벨 (예: '엑셀', 'ZIP')
  allowedMimes: (typeof allowedMimeByFileTypeConfig)[keyof typeof allowedMimeByFileTypeConfig]; // 허용 MIME 목록
  allowedExt?: RegExp; // 확장자 보조 체크 (file.type이 빈 문자열인 브라우저 대비)
  maxBytes: number; // 용량 제한
};

const makeFileSchema = (rule: FileRule) =>
  z.any().superRefine((file, ctx) => {
    if (!file || !(file instanceof File)) {
      ctx.addIssue({
        code: 'custom',
        message: '업로드 할 파일을 선택해주세요.',
      });
      return;
    }

    if (file.size === 0) {
      ctx.addIssue({ code: 'custom', message: '파일이 없습니다.' });
      return;
    }

    if (file.size > rule.maxBytes) {
      const mb = Math.floor(rule.maxBytes / (1024 * 1024));
      ctx.addIssue({
        code: 'custom',
        message: `파일 용량은 최대 ${mb}MB 까지 가능합니다.`,
      });
      return;
    }

    // 3) MIME / 확장자 체크
    const typeOk = file.type && rule.allowedMimes.has(file.type);
    const extOk =
      !file.type && rule.allowedExt ? rule.allowedExt.test(file.name) : false;

    if (!typeOk && !extOk) {
      const extMsg = rule.allowedExt ? ` (예: ${rule.allowedExt})` : '';
      ctx.addIssue({
        code: 'custom',
        message: `${rule.label} 파일만 업로드가 가능합니다.${extMsg}`,
      });
      return;
    }
  });

export const excelFileTypeSchema = makeFileSchema({
  label: '엑셀',
  maxBytes: MAX_FILE_BYTES,
  allowedMimes: allowedMimeByFileTypeConfig[FileTypeMap.EXCEL],
});

export const zipFileTypeSchema = makeFileSchema({
  label: 'zip',
  maxBytes: MAX_FILE_BYTES,
  allowedMimes: allowedMimeByFileTypeConfig[FileTypeMap.ZIP],
});
