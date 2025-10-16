import { KyResponse } from 'ky';

export const getResponseFileName = (response: KyResponse) => {
  if (!response) return '';

  const contentDisposition = response.headers.get('content-disposition');
  if (!contentDisposition) return '';

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match) {
    try {
      return decodeURIComponent(utf8Match[1]);
    } catch {
      return '';
    }
  }

  const asciiMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
  return asciiMatch?.[1] ?? '';
};
