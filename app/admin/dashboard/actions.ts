import { universalFetcher } from '@/shared/api/ky/universalFetcher';
import {
  TSalesBreakDownQuery,
  TSalesBreakDownResponse,
} from '@/shared/types/sales';

export const getSalesBreakDown = async (
  args: TSalesBreakDownQuery,
): Promise<TSalesBreakDownResponse[]> =>
  universalFetcher('getSalesBreakDown', args);
