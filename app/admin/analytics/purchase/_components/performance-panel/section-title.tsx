import React from 'react';

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex items-center gap-2 text-lg font-semibold text-zinc-900'>
      <span className='size-1.5 rounded-full bg-zinc-900' />
      {children}
    </div>
  );
};

export default SectionTitle;
