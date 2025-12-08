import { TableCell, TableRow } from '@/components/ui/table';

export function TableSkeletonRows({
  padY,
  rowLength = 7,
  colLength = 7,
}: {
  padY: string;
  rowLength?: number;
  colLength?: number;
}) {
  const arr = Array.from({ length: rowLength });
  const col = Array.from({ length: colLength });

  return (
    <>
      {arr.map((_, i) => (
        <TableRow key={i} className='animate-pulse'>
          {col.map((_, subI) => (
            <TableCell
              key={subI}
              className={`w-full border-t border-neutral-200 ${padY}`}
            >
              <div className='h-4 w-full rounded bg-neutral-200/70' />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
