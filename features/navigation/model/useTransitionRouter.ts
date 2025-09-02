import { useRouter } from 'next/navigation';
import { useCallback, useTransition } from 'react';

const useTransitionRouter = () => {
  const router = useRouter();
  const [_, startTransition] = useTransition();

  const push = useCallback(
    (pathname: string) => {
      startTransition(() => router.push(pathname));
    },
    [router],
  );

  return { push };
};

export default useTransitionRouter;
