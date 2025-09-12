import { noStoreEmptyResponse } from '@/lib/http.server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  return noStoreEmptyResponse({ status: 200 });
};
