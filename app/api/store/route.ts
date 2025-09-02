import { getStoreListInServer } from '@/actions/store.server';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const data = await getStoreListInServer();
    return NextResponse.json({ data });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
