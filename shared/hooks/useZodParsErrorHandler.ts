import { useCallback } from 'react';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

export type ServerValidationResult<T extends FieldValues> =
  | { ok: true; data?: any }
  | {
      ok: false;
      fieldErrors?: Partial<Record<FieldPath<T>, string>>;
      formError?: string;
    };

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  result: ServerValidationResult<T>;
}

const useZodParsErrorHandler = <T extends FieldValues>() => {
  const handlerSafeParse = useCallback(({ form, result }: Props<T>) => {
    if (!result.ok) {
      // 기존 에러 지우고 서버 에러 반영
      form.clearErrors();

      if (result.formError) {
        form.setError('root', { type: 'server', message: result.formError });
      }

      if (result.fieldErrors) {
        const entries = Object.entries(result.fieldErrors) as [
          FieldPath<T>,
          string | undefined,
        ][];

        entries.forEach(([key, message]) => {
          if (!message) return;
          form.setError(key, {
            type: 'server',
            message,
          });
        });
      }

      const firstErrorKey =
        (result.fieldErrors &&
          Object.keys(result.fieldErrors).find(
            (k) => result.fieldErrors?.[k as keyof typeof result.fieldErrors],
          )) ||
        undefined;
      if (firstErrorKey) form.setFocus(firstErrorKey as FieldPath<T>);
      return;
    }
  }, []);

  return { handlerSafeParse };
};

export default useZodParsErrorHandler;
