import { ErrorCode } from '@/shared/constants/error';

export const TAG = '__SAERR__|';

/**
 * axiosInterface를 통해 catch에서 에러를 가공해주는 함수
 * @param code THttpResponseKey 타입으로 어떤 종류의 에러인지
 * @param info TErrorResponseInfo 타입으로 status와 해당 에러 message
 * @returns {
 *
 * }
 */
export const enc = (err: TErrorResponseInfo) => {
  const json = JSON.stringify(err);
  return `${TAG}${json}`;
};

/**
 * 서버액션에서 에러를 보내줄 때 직렬화 이슈 때문에 이렇게 에러코드별로 직렬화가 가능한 json형태로 변경해주는 함수
 * @param e 서버액션의 에러
 * @returns { code: THttpResponseKey; info: TErrorResponseInfo } | undefined  : 어떤상태의 에러코드인지 코드와 에러 status와 메세지를 보냄
 */
export function parseServerActionCode(
  e: any,
): { code: THttpResponseKey; msg: string } | undefined {
  const msg = (e?.message as any) ?? '';

  if (typeof msg !== 'string') return undefined;
  if (!msg.startsWith(TAG)) return undefined;

  try {
    const json = msg.slice(TAG.length);
    const parsed = JSON.parse(json);
    return { code: parsed?.code, msg: parsed?.message };
  } catch {
    return undefined;
  }
}

// 서버와 통신 후 http error code
export const HttpResponseCode = {
  NETWORK: 'NETWORK',
  HTTP_401: 'HTTP_401',
  HTTP_403: 'HTTP_403',
  HTTP_404: 'HTTP_404',
  HTTP_5XX: 'HTTP_5XX',
  HTTP_4XX: 'HTTP_4XX',
  UNKNOWN: 'UNKNOWN',
} as const;

export type THttpResponseKey = keyof typeof HttpResponseCode;
export type TErrorResponseInfo = {
  status?: number;
  message?: string | ErrorCode;
  code: THttpResponseKey;
};

export type ActionResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      err: TErrorResponseInfo;
    };
