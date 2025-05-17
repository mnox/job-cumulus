import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const useFormatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export const useFormatDate = (date: string): string => {
  return format(new Date(date), "MMM dd, yyyy")
}

export const useFormatDateTime = (date: string): string => {
  return format(new Date(date), "MMM dd, yyyy h:mm a")
}