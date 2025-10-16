'use client';

import { getErrorMessage } from '@/lib/error';
import { clientKy } from '@/shared/api/ky/ky.client';
import {
  ActionResult,
  enc,
  HttpResponseCode,
  parseServerActionCode,
} from '@/shared/api/request/error';
import { requestApiJson } from '@/shared/api/request/request.server';
import { ErrorCode } from '@/shared/constants/error';
import { downloadFileByBlob } from '@/shared/file/download.lib';
import { getResponseFileName } from '@/shared/file/file';
import { HTTPError, Options } from 'ky';

type ClientOptions = Pick<
  Options,
  'method' | 'headers' | 'json' | 'body' | 'searchParams'
>;

/**
 * 네트워크 에러 시 실제 네트워크 에러인지 아니면 백앤드와의 이슈인지 판단 후 네티워크 이슈면 offline으로 이동
 */
export const networkErrorHandler = () => {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    const here = location.pathname + location.search;
    if (!here.startsWith('/offline')) {
      sessionStorage.setItem('lastPathBeforeOffline', here);
      location.assign('/offline');
    }
  }
};

/**
 * 세션이 만료되면 shared/session/store에 있는 값을 true로 변경해 주는 함수.
 * 변경이 되면 layout.tsx에 선언되어 있기 때문에 세션모달 오픈
 */
export const sessionExpiredErrorHandler = () => {
  // sessionStore.getState().setExpiredSession(true);
};

/**
 * 클라이언트에서 서버를 호출하기 위해 서버액션(브릿지)함수를 호출. 즉 클라->서버액션(브릿지)->서버(serverKy)를 호출하게 함으로써 쿠키값 보호
 * @param url 백앤드와 통신할 url
 * @param config ClientOptions 타입으로 method와 json, body, searchParams
 * 와 같은 알맞은 옵션
 * @returns 직렬화된 데이터 혹은 에러
 */
export const requestApiInClient = async <T>(
  url: string,
  config: ClientOptions,
): Promise<T> => {
  try {
    const result = await requestApiJson<T>(url, config);
    if (!result.ok) throw new Error(enc(result.err));
    return result.data;
  } catch (err: unknown) {
    const errorInfo = parseServerActionCode(err);
    const code = errorInfo?.code;
    const message = errorInfo?.msg ?? (await getErrorMessage(err)); // 내가 파싱한 에러가 아닌 경우에는 원래 에러 메세지 꺼내는 방식으로 가져올수 있게

    if (code === HttpResponseCode.NETWORK) {
      networkErrorHandler();
    } else if (code === HttpResponseCode.HTTP_401) {
      sessionExpiredErrorHandler();
    }

    throw new Error(message);
  }
};

export const requestApiForGet = async <T>(
  url: string,
  config: ClientOptions,
): Promise<T> => {
  try {
    const response = await clientKy<T>(url, config);
    const { data: result } = (await response.json()) as {
      data: ActionResult<T>;
    };
    if (!result.ok) throw new Error(result.err.message);
    return result.data;
  } catch (err: unknown) {
    const errorInfo = parseServerActionCode(err);
    const code = errorInfo?.code;
    const message = errorInfo?.msg ?? (await getErrorMessage(err)); // 내가 파싱한 에러가 아닌 경우에는 원래 에러 메세지 꺼내는 방식으로 가져올수 있게

    if (code === HttpResponseCode.NETWORK) {
      networkErrorHandler();
    } else if (code === HttpResponseCode.HTTP_401) {
      sessionExpiredErrorHandler();
    }

    throw new Error(message);
  }
};

/**
 * 클라이언트 내에서 파일을 다운받기 위한 함수.
 * 위에 함수를 사용하지않은 이유는 위에는 json. 즉 직렬화가 가능한 상태를 위함이고 이 함수는 route handler를 호출하여 그 안에서 해당 response를 받은 후 다운로드 가능하게
 * @param path 기본값은 api/download이지만 다른 route handler 경로가 있는 경우.
 * @param config ClientOptions 타입으로 route handler에 옵션으로 넘길 config들
 */
export const requestApiDownload = async (
  path: string,
  init?: ClientOptions,
) => {
  try {
    const url = `download/v1/${path}`;
    const response = await clientKy(url, init);
    const filename = getResponseFileName(response);
    const blob = await response.blob();

    if (!filename) throw new Error(ErrorCode.FILE_NOT_FOUND_MESSAGE);

    downloadFileByBlob(blob, filename);
  } catch (err: unknown) {
    if (err instanceof HTTPError) {
      const status = err.response.status;
      if (status === 401) {
        sessionExpiredErrorHandler();
      }
    } else {
      networkErrorHandler();
    }

    throw err;
  }
};
