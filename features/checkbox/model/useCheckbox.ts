import { useCallback, useState } from 'react';

interface Props<T> {
  rows: T[];
  getRowId: (row: T) => string | number;
}

const useCheckbox = <T>({ rows, getRowId }: Props<T>) => {
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const toggleAll = useCallback(() => {
    setSelected((prev) =>
      prev.size === rows.length
        ? new Set()
        : new Set(rows.map((row) => getRowId(row))),
    );
  }, [rows, getRowId]);

  const toggleOne = useCallback(
    (id: string | number) => {
      console.log(id);
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    },
    [rows, getRowId],
  );

  const isAllSelected = selected.size === rows.length;

  return { selected, toggleAll, toggleOne, isAllSelected };
};

export default useCheckbox;
