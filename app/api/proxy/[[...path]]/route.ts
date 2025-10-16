import { getErrorMessage } from '@/lib/error';
import { jsonNoStore } from '@/lib/http.server';
import { serverKy } from '@/shared/api/ky/ky.server';
import { ErrorCode } from '@/shared/constants/error';
import { HTTPError } from 'ky';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOW = [/^\/v2\//];

const handler = async (
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) => {
  try {
    const { path } = await params;
    const rawPath = '/' + (path?.join('/') ?? '');

    if (!ALLOW.some((rx) => rx.test(rawPath)))
      return jsonNoStore({ message: ErrorCode.ACCESS_DENIED }, { status: 403 });

    const baseUrl = path.slice(1).join('/');
    const url = baseUrl + (req.nextUrl.search || '');

    const response = await serverKy(url, {
      method: req.method,
      body: /^(GET|HEAD)$/i.test(req.method) ? undefined : req.body,
      headers: {
        'content-type': req.headers.get('content-type') ?? undefined,
      },
    });

    const headers = new Headers();
    const get = (k: string) =>
      response.headers instanceof Headers
        ? response.headers.get(k)
        : ((response.headers as any)[k] ?? undefined);

    const ct = get('content-type');
    const cd = get('content-disposition');
    if (ct) headers.set('Content-Type', ct);
    if (cd) headers.set('Content-Disposition', cd);
    headers.set('Cache-Control', 'no-store');
    headers.delete('set-cookie');

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });
  } catch (err: unknown) {
    const message = await getErrorMessage(err);

    if (err instanceof HTTPError) {
      return NextResponse.json({ message }, { status: err.response.status });
    }
    return NextResponse.json({ message }, { status: 500 });
  }
};

export const GET = handler;
export const HEAD = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
