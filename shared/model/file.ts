export const FILE_TYPE_VALUES = ['excel', 'zip'] as const;
export type TFileValue = (typeof FILE_TYPE_VALUES)[number];

export const FILE_TYPE_KEYS = [
  'EXCEL',
  'ZIP',
] as const satisfies Uppercase<TFileValue>[];
export type TFileKey = (typeof FILE_TYPE_KEYS)[number];

export const FileTypeMap = {
  EXCEL: 'excel',
  ZIP: 'zip',
} as const satisfies Record<TFileKey, TFileValue>;

export const allowedMimeByFileTypeConfig = {
  [FileTypeMap.EXCEL]: new Set([
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ]),
  [FileTypeMap.ZIP]: new Set([
    'application/zip',
    'application/x-zip-compressed',
    'application/x-zip',
    'application/octet-stream', // 일부 환경에서 zip이 octet-stream으로 올 수 있음
  ]),
} as const satisfies Record<TFileValue, Set<string>>;
