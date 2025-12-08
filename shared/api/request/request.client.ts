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
import { Options } from 'ky';

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
 * 클라이언트에서 서버를 호출하기 위한 통합 함수.
 * method가 'GET'인 경우 Next.js 권장 사항에 따라 기본적으로 라우트 핸들러를 호출합니다.
 * `mode: 'actions'`를 명시하면 'GET' 요청도 서버 액션으로 처리할 수 있습니다.
 * 그 외의 메서드는 서버 액션(브릿지) 함수를 호출합니다.
 * 이를 통해 쿠키 값 보호 및 일관된 에러 처리를 제공합니다.
 * @param url 백앤드와 통신할 url
 * @param config ClientOptions 타입으로 method와 json, body, searchParams
 * 와 같은 알맞은 옵션. `mode`는 'route' 또는 'actions'로 설정할 수 있습니다.
 * @returns 직렬화된 데이터 혹은 에러
 */
export const requestApiInClient = async <T>(
  url: string,
  config: ClientOptions & { mode?: 'route' | 'actions' } = {},
): Promise<T> => {
  try {
    if (!url) throw new Error('url이 존재하지 않습니다');

    const { mode, ...props } = config; // mode의 기본값을 제거하고 명시적으로 전달된 값만 사용
    const method = props.method?.toUpperCase() || 'GET';

    if (method === 'GET' && mode !== 'actions') {
      // GET 요청이면서 mode가 'actions'가 아닌 경우 (즉, 'route'이거나 undefined) 라우트 핸들러를 통해 처리
      const result = await clientKy<T>(url, props).json<ActionResult<T>>();
      if (!result.ok) throw new Error(result.err.message);
      return result.data;
    } else {
      // GET이 아니거나, GET 요청이면서 mode가 'actions'인 경우 서버 액션을 통해 처리
      const result = await requestApiJson<T>(url, props);
      if (!result.ok) throw new Error(enc(result.err));
      return result.data;
    }
  } catch (err: unknown) {
    const errorInfo = parseServerActionCode(err);
    const code = errorInfo?.code;
    const message = errorInfo?.msg ?? (await getErrorMessage(err));

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
 * 이 함수는 route handler를 호출하여 그 안에서 해당 response를 받은 후 다운로드 가능하게 합니다.
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
    const errorInfo = parseServerActionCode(err); // requestApiInClient와 동일한 에러 처리 로직 적용
    const code = errorInfo?.code;
    const message = errorInfo?.msg ?? (await getErrorMessage(err));

    if (code === HttpResponseCode.NETWORK) {
      networkErrorHandler();
    } else if (code === HttpResponseCode.HTTP_401) {
      sessionExpiredErrorHandler();
    }

    throw new Error(message);
  }
};
