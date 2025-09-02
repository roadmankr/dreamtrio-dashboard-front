/**
 * 서버/클라 공용 api 비동기 호출 함수
 * 서버인 경우는 정의된 서버액션 함수를 호출하며
 * 클라는 정의된 route handler를 호출하는데 method 방식에 따라 body, json 그리고
 * get인 경우에는 route handler 방법이 param인지 query인지를 파악 후 반영
 */

import { isFormData } from '@/lib/form';
import { buildPath, buildQuery } from '@/lib/http';
import { clientKy } from '@/shared/api/ky/ky.client';
import { InputOf, OutputOf } from '@/shared/types/http';
import { apiRegistry, TApiRegistry } from './../registry';

export async function universalFetcher<K extends keyof TApiRegistry>(
  key: K,
  input?: InputOf<TApiRegistry, K>,
): Promise<OutputOf<TApiRegistry, K>> {
  type In = InputOf<TApiRegistry, K>;
  type Out = OutputOf<TApiRegistry, K>;

  const meta = apiRegistry[key];
  // const hasInput = !(input === undefined || (input as any) === null);

  if (typeof window === 'undefined') {
    const server = await meta.server();
    return server(input as In) as Promise<Out>;
  }

  return await clientFetcher(key, input);
}

async function clientFetcher<K extends keyof TApiRegistry>(
  key: K,
  input?: InputOf<TApiRegistry, K>,
): Promise<OutputOf<TApiRegistry, K>> {
  type In = InputOf<TApiRegistry, K>;
  type Out = OutputOf<TApiRegistry, K>;

  const meta = apiRegistry[key];
  const method = meta.client.method.toUpperCase();

  if (method === 'GET') {
    return handleGetRequest<K, In, Out>(key, input);
  } else {
    return handleMutationRequest<K, In, Out>(key, input);
  }
}

async function handleGetRequest<K extends keyof TApiRegistry, In, Out>(
  key: K,
  input: In | undefined,
): Promise<Out> {
  const meta = apiRegistry[key];
  const url = meta.client.path;
  const hasInput = input !== undefined && input !== null;
  const hasParam = Array.from(url.matchAll(/:([A-Za-z0-9_]+)/g)).map(
    (m) => m[1],
  );

  let finalUrl = '';
  if (hasParam.length > 0) {
    finalUrl = buildPath(url, input);
  } else {
    const queryString = buildQuery(hasInput ? input : undefined);
    finalUrl = queryString ? `${url}${queryString}` : url;
  }

  const res = await clientKy(finalUrl as string).json<{ data: Out }>();
  return res.data;
}

async function handleMutationRequest<K extends keyof TApiRegistry, In, Out>(
  key: K,
  input: In | undefined,
): Promise<Out> {
  const meta = apiRegistry[key];
  const url = meta.client.path;
  const hasInput = input !== undefined && input !== null;
  const isFormDataInput = isFormData(input);

  const requestOptions = {
    method: meta.client.method,
    ...(hasInput && !isFormDataInput && { json: input }),
    ...(isFormDataInput && { body: input }),
  };

  const res = await clientKy(url, requestOptions).json<{ data: Out }>();
  return res.data;
}

// type ServerAction<TArgs extends any[], TReturn> = (
//   ...args: TArgs
// ) => Promise<TReturn>;

// /**
//  * 서버와 클라이언트 환경에 따라 적절한 데이터 fetching 로직을 선택하는 범용 fetcher 함수.
//  * 서버에서는 서버 액션을 직접 호출하고, 클라이언트에서는 API 라우트를 호출합니다.
//  *
//  * @param serverActionPath 서버 액션 파일의 경로 (예: '@/actions/store.server')
//  * @param clientApiPath 클라이언트에서 호출할 API 라우트 경로 (예: '/api/store')
//  * @param serverActionName 서버 액션 함수 이름 (예: 'getStoreListInServer')
//  * @param args 서버 액션에 전달할 인자 배열
//  * @returns 데이터 fetching 결과
//  */
// export const universalFetcher = async <T, TArgs extends any[]>(
//   serverActionPath: string,
//   clientApiPath: string,
//   serverActionName: string,
//   ...args: TArgs
// ): Promise<T> => {
//   if (typeof window === 'undefined') {
//     // 서버 환경: 서버 액션을 동적으로 임포트하여 호출
//     const serverModule = await import(serverActionPath);
//     const serverAction: ServerAction<TArgs, T> = serverModule[serverActionName];
//     if (!serverAction) {
//       throw new Error(
//         `Server action "${serverActionName}" not found in ${serverActionPath}`,
//       );
//     }
//     return serverAction(...args);
//   } else {
//     // 클라이언트 환경: API 라우트를 HTTP 요청으로 호출
//     // 클라이언트 API 경로에 인자를 쿼리 파라미터로 추가해야 할 경우를 대비하여 유연하게 처리
//     const queryString =
//       args.length > 0
//         ? `?${new URLSearchParams(args[0] as Record<string, string>).toString()}`
//         : '';
//     const url = `${clientApiPath}${queryString}`;
//     const result = await clientKy.get(url).json<{ data: T }>();
//     return result.data;
//   }
// };
