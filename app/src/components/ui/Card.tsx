import { HTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-white rounded-lg shadow-md',
      outlined: 'bg-white border border-gray-200 rounded-lg',
      elevated: 'bg-white rounded-lg shadow-lg'
    };

    return (
      <div
        ref={ref}
        className={clsx(variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card'; 