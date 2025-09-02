import useStoreDateSearchParams from '@/widgets/store-date-filter/model/useStoreDateSearchParams';
import { useEffect } from 'react';

const useScroll = ({ success }: { success: boolean }) => {
  const { dimension } = useStoreDateSearchParams();

  useEffect(() => {
    if (!success) return;
    setTimeout(() => {
      const id = requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>(
          `[data-section="${dimension}"]`,
        );
        if (!el) return;

        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      return () => cancelAnimationFrame(id);
    }, 500);
  }, [dimension, success]);

  return null;
};

export default useScroll;
