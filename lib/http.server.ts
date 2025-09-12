import 'server-only';

import { NextResponse } from 'next/server';

export const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store',
  Vary: 'Cookie, Authorization',
} as const;

export function redirectNoStore(url: string | URL, init?: ResponseInit) {
  const res = NextResponse.redirect(url, {
    status: init?.status ?? 303,
    headers: { ...NO_STORE_HEADERS, ...(init?.headers ?? {}) },
  });
  return res;
}

export function jsonNoStore<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: { ...NO_STORE_HEADERS, ...(init?.headers ?? {}) },
  });
}

export function noStoreEmptyResponse(init?: ResponseInit) {
  return NextResponse.json({
    ...init,
    headers: { ...NO_STORE_HEADERS, ...(init?.headers ?? {}) },
  });
}
