import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { CSSProperties } from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rtlFont(isRTL: boolean): string {
  return isRTL ? 'font-hebrew' : 'font-serif';
}

export function rtlBorderStyle(
  isRTL: boolean,
  borderWidth = '4px',
  padding = '1.5rem'
): CSSProperties {
  return {
    borderRightWidth: isRTL ? borderWidth : '0',
    borderLeftWidth: isRTL ? '0' : borderWidth,
    paddingRight: isRTL ? padding : '0',
    paddingLeft: isRTL ? '0' : padding,
    textAlign: isRTL ? 'right' : 'left',
  };
}
