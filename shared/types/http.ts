import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
// import { TApiRegistry } from '../api/registry';

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type TPlacement = 'query' | 'params';

/** 표준 서버 함수(문서화용). 꼭 안 써도 되지만 팀 내 컨벤션에 도움 됩니다. */
export type ServerFn<I, O> = [I] extends [void] | [undefined]
  ? () => Promise<O>
  : (input: I) => Promise<O>;

export type DefaultPlacement<M extends Method> = M extends 'GET'
  ? 'query'
  : never;
/** TSF = Type of Server Function
 *  ActionDef은 "실제 서버 함수 타입"만 받습니다.
 *  as const 레지스트리와 어울리도록 readonly 지정.
 */
export type ActionDef<
  TSF extends (...args: any) => any,
  M extends Method = 'GET',
  P extends TPlacement = DefaultPlacement<M>,
> = {
  readonly server: () => Promise<TSF>;
  readonly client: {
    readonly path: string;
    readonly method: M;
    readonly placement?: P; // GET만 의미있음
  };
};

/** 함수 유틸 */
type FnParams<T> = T extends (...args: infer P) => any ? P : never;
type FnReturn<T> = T extends (...args: any) => any
  ? Awaited<ReturnType<T>>
  : never;

/** ★ TSF만 기반으로 추론 (ActionDef의 TSF 제네릭에서 바로 뽑음) */
export type InputOf<R, K extends keyof R> =
  R[K] extends ActionDef<infer TSF, any>
    ? FnParams<TSF> extends []
      ? void
      : FnParams<TSF>[0]
    : never;

export type OutputOf<R, K extends keyof R> =
  R[K] extends ActionDef<infer TSF, any> ? FnReturn<TSF> : never;

export type MethodOf<R, K extends keyof R> =
  R[K] extends ActionDef<any, infer M> ? M : Method;

export type QueryOpts<TFnData, TData, TKey extends QueryKey = QueryKey> = Omit<
  UseQueryOptions<TFnData, Error, TData, TKey>,
  'queryKey' | 'queryFn'
>;
// type ParamKeys<S extends string> = S extends `${string}:${infer P}/${infer R}`
//   ? P | ParamKeys<R>
//   : S extends `${string}:${infer P}`
//     ? P
//     : never;

// // 레지스트리 K에 대한 param 키 유니온
// export type PathParamKeys<K extends keyof TApiRegistry> = ParamKeys<
//   TApiRegistry[K]['client']['path']
// >;

// // 반환 타입: path/query 분리
// export type SplitResult<K extends keyof TApiRegistry> = {
//   // pathParams = In 중에서 PathParamKeys<K>만 Pick
//   pathParams: Partial<
//     Pick<
//       InputOf<TApiRegistry, K>,
//       Extract<PathParamKeys<K>, keyof InputOf<TApiRegistry, K>>
//     >
//   >;
//   // restQuery = In에서 그 키들만 Omit
//   restQuery: Partial<
//     Omit<
//       InputOf<TApiRegistry, K>,
//       Extract<PathParamKeys<K>, keyof InputOf<TApiRegistry, K>>
//     >
//   >;
// };

// export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
// // export type ServerArgs<I> = [I] extends [void] | [undefined]
// //   ? []
// //   : (input: I) => Promise<O>;
// export type ServerFn<I, O> = [I] extends [void] | [undefined]
//   ? () => Promise<O>
//   : (input: I) => Promise<O>;

// export type ActionDef<I, O, M extends Method = 'GET'> = {
//   server: () => Promise<ServerFn<I, O>>;
//   client: { path: string; method: M };
// };

// export type InputOf<R, K extends keyof R> =
//   R[K] extends ActionDef<infer I, any, any> ? I : never;
// export type OutputOf<R, K extends keyof R> =
//   R[K] extends ActionDef<any, infer O, any> ? O : never;
// export type MethodOf<R, K extends keyof R> =
//   R[K] extends ActionDef<any, any, infer M> ? M : Method;

// // type _ServerFnOf<R, K extends keyof R> = R[K] extends {
// //   server: () => Promise<infer F>;
// // }
// //   ? F
// //   : never;
// // type _Params<T> = T extends (...args: infer P) => any ? P : never;
// // type _Ret<T> = T extends (...args: any) => Promise<infer O> ? O : never;

// // export type InputOf<R, K extends keyof R> =
// //   _Params<_ServerFnOf<R, K>> extends [] ? void : _Params<_ServerFnOf<R, K>>[0];

// // export type OutputOf<R, K extends keyof R> = _Ret<_ServerFnOf<R, K>>;
