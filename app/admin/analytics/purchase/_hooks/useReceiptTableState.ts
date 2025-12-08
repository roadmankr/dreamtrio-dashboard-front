import useCheckbox from '@/shared/hooks/useCheckbox';
import { TSlip } from '@/shared/types/analyze';
import { useCallback, useEffect } from 'react';

const useReceiptTableState = ({ rows }: { rows: TSlip[] }) => {
  const getRowId = useCallback((row: TSlip) => row.slipNo, []);

  const { isAllSelected, toggleAll, toggleOne, selected, toggleReset } =
    useCheckbox({
      rows,
      getRowId,
    });

  useEffect(() => {
    toggleReset();
  }, [rows, toggleReset]);

  return {
    rows,
    selection: { isAllSelected, toggleAll, toggleOne, selected, getRowId },
  };
};

export default useReceiptTableState;
