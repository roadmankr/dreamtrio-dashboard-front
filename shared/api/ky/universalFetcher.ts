/**
 * 서버/클라 공용 api 비동기 호출 함수
 * 서버인 경우는 정의된 서버액션 함수를 호출하며
 * 클라는 정의된 route handler를 호출하는데 method 방식에 따라 body, json 그리고
 * get인 경우에는 route handler 방법이 param인지 query인지를 파악 후 반영
 */

import { hasFormDataProp, isFormData } from '@/lib/form';
import { buildPath, buildQuery, splitPathParams } from '@/lib/http';
import { clientKy } from '@/shared/api/ky/ky.client';
import { InputOf, OutputOf } from '@/shared/types/http';
import { Options } from 'ky';
import { apiRegistry, TApiRegistry } from './../registry';

export async function universalFetcher<K extends keyof TApiRegistry>(
  key: K,
  input?: InputOf<TApiRegistry, K>,
): Promise<OutputOf<TApiRegistry, K>> {
  try {
    type In = InputOf<TApiRegistry, K>;
    type Out = OutputOf<TApiRegistry, K>;

    const meta = apiRegistry[key];

    if (typeof window === 'undefined') {
      const server = await meta.server();
      return server(input as In) as Promise<Out>;
    }

    return await clientFetcher(key, input);
  } catch (err: unknown) {
    throw err;
  }
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
    return handleGetRequest<K>(key, input);
  } else {
    return handleMutationRequest<K, In, Out>(key, input);
  }
}

async function handleGetRequest<K extends keyof TApiRegistry>(
  key: K,
  input: InputOf<TApiRegistry, K> | undefined,
): Promise<OutputOf<TApiRegistry, K>> {
  const meta = apiRegistry[key];
  const url = meta.client.path;

  const { pathParams, restQuery } = splitPathParams(
    key,
    input ?? ({} as InputOf<TApiRegistry, K>),
  );

  const finalPath = buildPath(url, pathParams);
  const qs = buildQuery(Object.keys(restQuery).length ? restQuery : undefined);
  const finalUrl = qs ? `${finalPath}${qs}` : finalPath;

  const res = await clientKy(finalUrl).json<{
    data: OutputOf<TApiRegistry, K>;
  }>();

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

  const requestOptions: Options = { method: meta.client.method };

  if (hasInput) {
    if (isFormDataInput) {
      requestOptions.body = input;
    } else if (hasFormDataProp(input)) {
      const { formData, ...rest } = input as any;
      for (const [k, v] of Object.entries(rest)) {
        if (v) formData.append(k, v);
      }
      requestOptions.body = formData;
    } else {
      requestOptions.json = input;
    }
  }

  const res = await clientKy(url, requestOptions).json<{ data: Out }>();
  return res.data;
}
