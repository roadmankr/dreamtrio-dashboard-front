import { ErrorCode } from '@/shared/constants/error';

export const TAG = '__SAERR__';

export function parseServerActionCode(e: any): THttpResponseKey | undefined {
  const msg: string = e?.message || '';

  if (!msg.startsWith(`${TAG}|`)) return undefined;
  try {
    const json = msg.slice(`${TAG}|`.length);
    const parsed = JSON.parse(json);
    return parsed?.code;
  } catch {
    return undefined;
  }
}

export function parseServerActionInfo(e: any): string | undefined {
  const msg: string = e?.message || '';

  if (!msg.startsWith(`${TAG}|`)) return undefined;
  try {
    const json = msg.slice(`${TAG}|`.length);
    const parsed = JSON.parse(json);
    return parsed?.info;
  } catch {
    return undefined;
  }
}

const HTTP_RESPONSE_KEY = [
  'NETWORK',
  'HTTP_401',
  'HTTP_403',
  'HTTP_5XX',
  'HTTP_4XX',
  'UNKNOWN',
] as const;
export type THttpResponseKey = (typeof HTTP_RESPONSE_KEY)[number];

export const HttpResponseCode = {
  NETWORK: 'NETWORK',
  HTTP_401: 'HTTP_401',
  HTTP_403: 'HTTP_403',
  HTTP_5XX: 'HTTP_5XX',
  HTTP_4XX: 'HTTP_4XX',
  UNKNOWN: 'UNKNOWN',
} satisfies Record<THttpResponseKey, THttpResponseKey>;

export type TErrorResponseInfo = {
  status?: number;
  message?: string | ErrorCode;
};
