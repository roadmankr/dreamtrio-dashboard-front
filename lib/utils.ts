import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number = 1000) {
  return new Promise((r) => setTimeout(r, ms));
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay = 150,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay = 150,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timeout) return;
    timeout = setTimeout(() => {
      func.apply(this, args);
      timeout = null;
    }, delay);
  };
};
