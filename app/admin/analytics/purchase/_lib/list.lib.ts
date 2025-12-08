import { TAnalyzeRanking, TAnalyzeTableRanking } from '@/shared/types/analyze';

export const makeRankList = (list: TAnalyzeRanking): TAnalyzeTableRanking[] => {
  const length = Math.max(list.inbound.length, list.outbound.length);
  const result = [];
  for (let i = 0; i < length; ++i) {
    result.push({
      rank: i + 1,
      inbound: list.inbound[i],
      outbound: list.outbound[i],
    });
  }

  return result;
};
// list.map((data) => data);
// list.map((data, index) => ({
//   rank: index + 1,
//   inbound: data.inbound[index],
//   outbound: data.oubound[index],
// }));
