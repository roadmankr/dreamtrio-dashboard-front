import type { Dimension } from '@/shared/model/dimension';
import { ViewState } from '@/shared/model/status';
import useQuerySectionScroll from './useQuerySectionScroll';

type Props = {
  enabled: boolean;
  isPending: boolean;
  isError: boolean;
  hasData: boolean;
  dimension: Dimension;
  isFetched?: boolean;
};

const useChartViewState = ({
  enabled,
  isPending,
  isError,
  hasData,
  dimension,
  isFetched,
}: Props) => {
  useQuerySectionScroll({
    isFetched,
    dimension,
  });

  const status = !enabled
    ? ViewState.IDLE
    : enabled && isPending
      ? ViewState.PENDING
      : isError
        ? ViewState.ERROR
        : !hasData
          ? ViewState.EMPTY
          : ViewState.SUCCESS;

  return { status };
};

export default useChartViewState;
