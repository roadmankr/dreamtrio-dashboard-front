import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number = 1000) {
  return new Promise((r) => setTimeout(r, ms));
}

export const debounce = <T extends (...args: any) => any>(
  func: T,
  delay: number = 150,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      result = func(...args);
    }, delay);
    return result;
  };
};
