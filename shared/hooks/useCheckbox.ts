import { useCallback, useState } from 'react';

interface Props<T, K> {
  rows: T[];
  getRowId: (row: T) => K;
}

const useCheckbox = <T, K>({ rows, getRowId }: Props<T, K>) => {
  const [selected, setSelected] = useState<Set<K>>(new Set());

  const toggleAll = useCallback(() => {
    if (!rows.length) return;

    setSelected((prev) =>
      prev.size === rows.length
        ? new Set()
        : new Set(rows.map((row) => getRowId(row))),
    );
  }, [rows, getRowId]);

  const toggleOne = useCallback(
    (id: K) => {
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    },
    [rows, getRowId],
  );

  const toggleReset = useCallback(() => {
    setSelected(new Set());
  }, []);

  const isAllSelected = selected.size === rows.length;

  return { selected, toggleAll, toggleOne, isAllSelected, toggleReset };
};

export default useCheckbox;
