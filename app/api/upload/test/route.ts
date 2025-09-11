export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const form = await req.formData(); // 1.7MB 충분히 OK
  const file = form.get('file');

  if (!(file instanceof File) || file.size === 0) {
    return new Response('파일이 없습니다', { status: 400 });
  }
  // serverKy/axiosServer로 그대로 전송 (헤더에 Content-Type 수동 지정 금지)
  // ...
  return Response.json({ ok: true });
}
