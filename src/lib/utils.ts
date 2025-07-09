import { type ClassValue, clsx } from "clsx"; // Imports types and clsx for combining classes
import { twMerge } from "tailwind-merge"; // Imports twMerge for resolving Tailwind conflicts

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Combines classes using clsx and resolves conflicts with twMerge
}
