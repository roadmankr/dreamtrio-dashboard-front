/**
 * queryString으로 dimenstion 타입이 존재하는 경우
 * 각 차트별로의 isFetched를 참조하여 에러 든 성공이든 확인을 하고 그걸 store에 저장
 * 저장된 store와 화면에 그려질 타입의 갯수를 확인 후 동일해 지면 그때 queryString으로 넘어온 타입으로 스크롤 이동
 */

import { isDimension, type Dimension } from '@/shared/model/dimension';
import { useEffect, useRef } from 'react';

import { CHART_DIMENSIONS_LENGTH } from '@/components/ui/charts/pie-chart/pie-chart.config';
import { queryStringScrollStore } from '../_store';
import useStoreDateSearchParams from './useStoreDateSearchParams';

const useQuerySectionScroll = ({
  isFetched,
  dimension,
}: {
  dimension: Dimension;
  isFetched?: boolean;
}) => {
  const hasRunRef = useRef<string | null>(null);
  const { dimension: target } = useStoreDateSearchParams();
  const successDimensions = queryStringScrollStore(
    (state) => state.successDimensions,
  );
  const setSuccessDimensions = queryStringScrollStore(
    (state) => state.setSuccessDimensions,
  );
  const resetSuccessDimensions = queryStringScrollStore(
    (state) => state.resetSuccessDimensions,
  );

  useEffect(() => {
    if (!isFetched || !dimension || !isDimension(dimension)) return;
    if (!successDimensions.includes(dimension) && isFetched) {
      setSuccessDimensions(dimension);
      return;
    }
    if (
      successDimensions.length !== CHART_DIMENSIONS_LENGTH ||
      hasRunRef.current
    )
      return;

    const id = requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(
        `[data-section="${target}"]`,
      );

      if (!el) return;
      hasRunRef.current = target;

      const scrollY = window.scrollY;
      const top = el.getBoundingClientRect().top - 20 + scrollY || 1;

      window.scrollTo({ top, behavior: 'smooth' });
    });

    return () => {
      cancelAnimationFrame(id);
      resetSuccessDimensions();
      hasRunRef.current = null;
    };
  }, [
    resetSuccessDimensions,
    target,
    isFetched,
    dimension,
    successDimensions,
    setSuccessDimensions,
  ]);
};

export default useQuerySectionScroll;
