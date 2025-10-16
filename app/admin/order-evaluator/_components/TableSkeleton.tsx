import { TableCell, TableRow } from '@/components/ui/table';

export function SkeletonRows({ padY }: { padY: string }) {
  const arr = Array.from({ length: 7 });
  const col = Array.from({ length: 7 });
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
