import { ref } from "vue";

const useDebounce = <T extends (...args: any[]) => any>(
  delay: number,
  callback: T,
): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFunction = ref(() => {
    if (timeoutId !== null) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback();
    }, delay);
  });

  const debounceWrapper = () => {
    debouncedFunction.value();
  };

  return debounceWrapper;
};

export default useDebounce;
