'use server';

import { getErrorMessage } from '@/lib/error';

import { prefetchKy, serverKy } from '@/shared/api/ky/ky.server';
import { ActionResult, HttpResponseCode } from '@/shared/api/request/error';
import { HTTPError, Options, TimeoutError } from 'ky';

export const requestApiForPrefetch = async <T>(
  url: string,
  options: Options,
): Promise<T> => {
  return prefetchKy(url, options).json<T>();
};

export const requestApiJson = async <T>(
  url: string,
  options: Options,
): Promise<ActionResult<T>> => {
  try {
    const data = await serverKy(url, options).json<T>();
    return { ok: true, data };
  } catch (err: unknown) {
    const message = await getErrorMessage(err);

    if (err instanceof HTTPError) {
      const status = err.response?.status ?? 0;

      if (status === 401) {
        return {
          ok: false,
          err: {
            code: HttpResponseCode.HTTP_401,
            message,
            status,
          },
        };
      }
      if (status === 403) {
        return {
          ok: false,
          err: {
            code: HttpResponseCode.HTTP_403,
            message,
            status,
          },
        };
      }
      if (status >= 500) {
        return {
          ok: false,
          err: {
            code: HttpResponseCode.HTTP_5XX,
            message,
            status,
          },
        };
      }
      return {
        ok: false,
        err: {
          code: HttpResponseCode.HTTP_4XX,
          message,
          status,
        },
      };
    }

    if (err instanceof TimeoutError) {
      return {
        ok: false,
        err: {
          code: HttpResponseCode.NETWORK,
          message,
        },
      };
    }

    // AbortError 등
    if ((err as any)?.name === 'AbortError') {
      return {
        ok: false,
        err: {
          code: HttpResponseCode.NETWORK,
          message,
        },
      };
    }

    return {
      ok: false,
      err: {
        code: HttpResponseCode.UNKNOWN,
        message,
      },
    };
  }
};

export const requestApiJsonOrThrow = async <T>(
  url: string,
  options: Options,
): Promise<T> => {
  const result = await requestApiJson<T>(url, options);

  if (!result.ok) throw new Error(result.err.message);

  return result.data;
};
