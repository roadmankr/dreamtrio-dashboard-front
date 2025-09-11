export function SkeletonRows({ padY }: { padY: string }) {
  const arr = Array.from({ length: 7 });
  const col = Array.from({ length: 7 });
  return (
    <>
      {arr.map((_, i) => (
        <tr key={i} className='animate-pulse'>
          {col.map((_, subI) => (
            <td
              key={subI}
              className={`border-t border-neutral-200 px-4 ${padY}`}
            >
              <div className='h-4 w-28 rounded bg-neutral-200/70' />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
