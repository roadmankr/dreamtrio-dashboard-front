import { Options } from 'ky';
import 'server-only';

import { serverKy } from '../api/ky/ky.server';

export const requestApiCore = async <T>(
  url: string,
  options: Options,
): Promise<T> => {
  try {
    return await serverKy(url, options).json<T>();
  } catch (error: unknown) {
    throw error;
  }
};

export const requestApi = async <T>(
  url: string,
  options: Options,
): Promise<T> => {
  try {
    return await requestApiCore(url, options);
  } catch (error: unknown) {
    throw error;
  }
};

export const requestApiForPrefetch = async <T>(
  url: string,
  options: Options,
): Promise<T> => {
  return await requestApiCore(url, options);
};
