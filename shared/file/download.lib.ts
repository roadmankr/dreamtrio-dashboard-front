'use client';

import { showToastError } from '@/lib/toast';
import { getResponseFileName } from '@/shared/file/file';
import { KyResponse } from 'ky';
import { toast } from 'sonner';

/**
 * 실제로 url과 파일네임을 가지고 다운로드하는 코어 함수
 * @param url 다운로드할 url
 * @param fileName 다운로드할 파일네님
 */
export const downloadFileCore = (url: string, fileName: string) => {
  const a = document.createElement('a');

  a.href = url;
  a.download = fileName; // 저장할 파일명 설정 (확장자 변경 가능)
  document.body.appendChild(a);
  a.click();

  // 다운로드 후 정리
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

/**
 * url을 가지고 파일 다운로드 하는 함수
 * 다운이 완료되고 toast까지
 * @param url 다운로드할 url
 * @param fileName 다운로드할 파일네님
 */
export const downloadFileByUrl = (url: string, fileName: string) => {
  downloadFileCore(url, fileName);

  toast.success('다운로드 성공', { description: '다운로드에 성공하였습니다' });
};

/**
 * api 통신후 받은 response를 가지고 blob형태를 가지고 파일 다운로드 하는 함수
 * @param blob api 통신후 받은 response를 가지고 blob형태
 * @param fileName 다운로드할 파일네님
 */
export const downloadFileByBlob = (blob: Blob, fileName: string) => {
  const url = window.URL.createObjectURL(blob);
  downloadFileCore(url, fileName);
};

/**
 * response에서 filename을 얻어 다운로드 후 결과까지 보여주는 함수
 * @param {response}  Ky라이브러리를 통해 api 통신한 결과값
 * @param {onSuccess}  다운로드 후 실행될 콜백함수
 * @param {title}  성공 후 toast에 보여질 메세지. 기본은 다운로드
 * @returns
 */
export const downloadFileInResponse = async ({
  response,
  onSuccess,
  title = '',
  fileName = '',
}: {
  response: KyResponse;
  title?: string;
  fileName?: string;
  onSuccess?: () => void;
}) => {
  if (!response) return;

  const filename = getResponseFileName(response) || fileName || '';

  if (!filename && typeof window !== 'undefined') {
    showToastError({
      title: '',
      description: '파일이름이 존재하지 않습니다.',
    });
    return;
  }

  const blob = await response.blob();
  await downloadFileByBlob(blob, filename);
  onSuccess?.();

  toast.success(`${title} 다운로드 성공`, {
    description: `${title} 다운로드에 성공하였습니다.`,
  });
};
