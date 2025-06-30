import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const colorVariants = {
  bg: {
    blue: 'bg-primary',
    purple: 'bg-accent',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  },
  text: {
    blue: 'text-primary',
    purple: 'text-accent',
    green: 'text-green-500',
    orange: 'text-orange-500',
  },
  border: {
    blue: 'border-primary',
    purple: 'border-accent',
    green: 'border-green-500',
    orange: 'border-orange-500',
  },
  ring: {
    blue: 'focus:ring-primary',
    purple: 'focus:ring-accent',
    green: 'focus:ring-green-500',
    orange: 'focus:ring-orange-500',
  },
};

export const getColorClasses = (color: 'blue' | 'purple' | 'green' | 'orange', variant: 'bg' | 'text' | 'border' | 'ring') => {
  return colorVariants[variant][color] || colorVariants[variant].blue;
};
