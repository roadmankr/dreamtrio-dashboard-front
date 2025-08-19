import { ErrorCode } from "@/shared/constants";
import { HTTPError, TimeoutError } from "ky";

export const getErrorMessage = async (error: unknown) => {
  if (error instanceof HTTPError) {
    try {
      const errorBody = await error.response.json().catch(() => null);

      if (errorBody && typeof errorBody === 'object' && 'message' in errorBody) {
        return String(errorBody.message);
      }

      return JSON.stringify(errorBody ?? (await error.response.text()));
    } catch {
      return `HTTP Error: ${error.response.status}`;
    }
  }

  if (error instanceof TimeoutError) {
    return ErrorCode.TIMEOUT_ERROR;
  }

  if (error instanceof DOMException && error.name === 'AbortError') {
    return ErrorCode.ABORT_REQUEST;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    return JSON.stringify(error);
  }

  return ErrorCode.UNKNOWN_ERROR;
};