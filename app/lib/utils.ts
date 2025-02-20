import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const outlineStyle = clsx(
  'focus-visible:outline-4',
  'focus-visible:outline-seggreen',
  'focus-visible:ring-0'
);