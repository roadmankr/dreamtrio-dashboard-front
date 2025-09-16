import { getErrorMessage } from '@/lib/error';
import { Options } from 'ky';
import { requestApi } from './request.server';

export const requestApiInClient = async <T>(url: string, options: Options) => {
  try {
    return await requestApi<T>(url, options);
  } catch (error) {
    throw new Error(await getErrorMessage(error));
  }
};
