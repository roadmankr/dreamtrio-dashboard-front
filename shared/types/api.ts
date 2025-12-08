import { Options } from 'ky';

export type ApiTuple = readonly [string, Options];

// 함수 or 튜플 모두 허용
export type EndpointBuilder<P = any> =
  | ((...params: P[]) => ApiTuple)
  | ApiTuple;
