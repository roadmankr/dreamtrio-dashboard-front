import { Options } from 'ky';

export const salesApis = {
  breakdown: ['/api/sales', { method: 'get' }],
} as const satisfies Record<string, [string, Options]>;
