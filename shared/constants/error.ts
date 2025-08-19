export enum ErrorCode {
  SERVER_ERROR = '서버 오류 입니다. 관리자에게 문의해주세요',
  TIMEOUT_ERROR = '요청이 시간 초과되었습니다.',
  ABORT_REQUEST = '요청이 취소되었습니다.',
  UNKNOWN_ERROR = '알 수 없는 서버 오류가 발생했습니다.',
  UNAUTHORIZED = '잘못된 jwt 서명입니다.',
  EXCEL_UPLOAD_FAILED = '엑셀업로드에 실패하였습니다',
}
