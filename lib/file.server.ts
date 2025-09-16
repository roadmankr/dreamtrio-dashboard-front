import 'server-only';

import {
  allowedMimeByFileTypeConfig,
  FileTypeMap,
  TFileValue,
} from '@/shared/model/file';

export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB 예시

export function validateFile(
  file: FormDataEntryValue | null,
  fileType: TFileValue = FileTypeMap.EXCEL,
) {
  if (!(file instanceof File) || file.size === 0) {
    return { result: false, message: '파일이 없습니다' };
  }

  if (file.size > MAX_FILE_BYTES) {
    return { result: false, message: '파일용량은 최대10MB 입니다.' };
  }

  if (file.type && !allowedMimeByFileTypeConfig[fileType].has(file.type)) {
    return { result: false, message: '허용되지 않는 파일 형식입니다' };
  }

  return { result: true };
}
