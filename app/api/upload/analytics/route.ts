import { uploadOrderEvaluatorFileInServer } from '@/actions/upload.server';
import dayjs from '@/lib/dayjs';
import { getErrorMessage } from '@/lib/error';
import { jsonNoStore } from '@/lib/http.server';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB 예시
const ALLOWED_MIME = new Set([
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file');
  const storeId = req.nextUrl.searchParams.get('storeId');
  const saleDate = req.nextUrl.searchParams.get('saleDate');

  if (!(file instanceof File) || file.size === 0) {
    return jsonNoStore({ message: '파일이 없습니다' }, { status: 400 });
  }

  if (file.size > MAX_FILE_BYTES) {
    return jsonNoStore({ message: '파일 용량이 너무 큽니다' }, { status: 413 });
  }

  if (file.type && !ALLOWED_MIME.has(file.type)) {
    return jsonNoStore(
      { message: '허용되지 않는 파일 형식입니다' },
      { status: 415 },
    );
  }

  if (!storeId || isNaN(+storeId))
    return jsonNoStore({ message: '매장정보가 없습니다' }, { status: 400 });
  if (!saleDate || !dayjs(saleDate).isValid())
    return jsonNoStore({ message: '기간이 없습니다' }, { status: 400 });

  const params = {
    saleDate,
    storeId: +storeId,
    formData: form,
  };

  try {
    const data = await uploadOrderEvaluatorFileInServer(params);
    return jsonNoStore({ data }, { status: 200 });
  } catch (err: unknown) {
    return jsonNoStore(
      { message: await getErrorMessage(err) },
      { status: 500 },
    );
  }
}

// export async function POST(req: Request) {
//   const form = await req.formData(); // 1~2MB 등 소용량 OK
//   const { fileId, filename } = await uploadExcelToBackend(form);

//   // 업로드 후 즉시 결과 파일 받기
//   const dl = await downloadResultFromBackend(fileId);
//   const name = filename ?? 'result.xlsx';
//   const ct = dl.headers.get('content-type') ?? 'application/octet-stream';
//   const dispo = `attachment; filename="${encodeURIComponent(name)}"; filename*=UTF-8''${encodeURIComponent(name)}`;

//   return new Response(dl.body, {
//     headers: {
//       'Content-Type': ct,
//       'Content-Disposition': dispo,
//       'Cache-Control': 'no-store, max-age=0',
//     },
//   });
// }
