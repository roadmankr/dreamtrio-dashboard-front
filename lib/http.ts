import { KyResponse } from 'ky';

export const parseDownloadFilename = (response: KyResponse) => {
  if (!response) return '';

  const contentDisposition = response.headers.get('content-disposition');

  if (!contentDisposition) return '';

  const utf8Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match) {
    try {
      return decodeURIComponent(utf8Match[1]);
    } catch {
      return '';
    }
  }

  const asciiMatch = contentDisposition.match(/filename="?([^"]+)"?/i);
  return asciiMatch?.[1] ?? '';
};

export const returnResponseBlob = async (response: KyResponse) => {
  const filename = parseDownloadFilename(response);
  const mime =
    response.headers.get('content-type') ?? 'application/octet-stream';
  const ab = await response.arrayBuffer();
  const bytes = new Uint8Array(ab);

  return { filename, bytes, mime };
};

export const buildPath = (path: string, params: unknown) => {
  if (!params) return path;

  if (params && typeof params === 'object') {
    const p = params as Record<string, any>;
    return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
      const v = p[key];
      if (v === undefined) throw new Error(`Missing path param: ${key}`);
      return encodeURIComponent(String(v));
    });
  }

  return path.replace(/:([a-zA-Z0-9_]+)/g, `${params}`);
};

export const buildQuery = (params: unknown) => {
  const sp = new URLSearchParams();
  if (params && typeof params === 'object') {
    for (const [k, v] of Object.entries(params as Record<string, any>)) {
      if (!v) sp.delete(k);
      else if (Array.isArray(v)) v.forEach((vv) => sp.append(k, String(vv)));
      else if (typeof v === 'object') sp.set(k, JSON.stringify(v));
      else sp.set(k, String(v));
    }
  }
  const s = sp.toString();
  return s ? `?${s}` : '';
};
