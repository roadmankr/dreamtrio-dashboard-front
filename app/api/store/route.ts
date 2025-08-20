import { getStoreList } from '@/actions/store.server';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const data = await getStoreList();
    return NextResponse.json({ data });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
