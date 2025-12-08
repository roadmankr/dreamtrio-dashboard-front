import { Options } from 'ky';

export const salesApis = {
  breakdownInClient: ['sales', { method: 'get' }],
} as const satisfies Record<string, [string, Options]>;
