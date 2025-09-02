import { getStoreDetailInServer } from '@/actions/store.server';
import { getErrorMessage } from '@/lib/error';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  _: NextRequest,
  { params }: { params: { storeId: number } },
) => {
  try {
    const { storeId } = await params;

    if (!storeId || isNaN(storeId))
      return new Response(
        JSON.stringify({ message: '매장아이디가 존재하지 않습니다' }),
        {
          status: 400,
        },
      );

    const data = await getStoreDetailInServer({ storeId });
    return NextResponse.json({ data });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ message: await getErrorMessage(err) }),
      {
        status: 500,
      },
    );
  }
};
