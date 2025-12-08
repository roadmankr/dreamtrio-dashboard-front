const NoResultTable = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/60 py-6 text-center'>
        {/* 아이콘 영역 (lucide-react 사용 시) */}
        <div className='flex size-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm'>
          {/* <Inbox className="size-6 text-zinc-400" /> */}
          <svg viewBox='0 0 24 24' className='size-6 text-zinc-400' aria-hidden>
            <path
              fill='currentColor'
              d='M19 3H5a2 2 0 0 0-2 2v11a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V5a2 2 0 0 0-2-2Zm0 13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2h4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2h4v2Zm0-4h-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2H5V5h14v7Z'
            />
          </svg>
        </div>

        <div className='space-y-1'>
          <p className='text-sm font-semibold text-zinc-800'>
            표시할 데이터가 없어요
          </p>
        </div>
      </div>
    </>
  );
};

export default NoResultTable;
