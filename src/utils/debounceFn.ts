/* eslint-disable @typescript-eslint/no-explicit-any */
export function debouncedFn<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number
): (...args: Params) => any {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
