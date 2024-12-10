import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Универсальная функция для объединения классов с устранением конфликтов TailwindCSS.
 */
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default cn;