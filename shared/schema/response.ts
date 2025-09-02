import { z } from 'zod';

/**
 * 클라이언트 API Route Handler의 공용 응답 형태를 위한 Zod 스키마
 * @param dataSchema 실제 데이터의 Zod 스키마
 */
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
  });

// API별 응답 데이터 스키마
export const storeSchemas = {
  getStoreList: z.array(z.string()),
  // 다른 매장 관련 스키마들...
};

export const salesSchemas = {
  // 매출 관련 스키마들...
};

export const productSchemas = {
  // 상품 관련 스키마들...
};
