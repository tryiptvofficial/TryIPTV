import { cn } from '@/lib/utils';
import type React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ children, className, as: Component = 'div' }: ContainerProps) {
  return (
    // Side padding is the original px-5 / sm:px-6 / lg:px-8, raised to the notch inset in landscape
    // (viewport-fit=cover); backgrounds outside the container stay full-bleed.
    // The max width is 77.5rem (1240px at 16px) so it grows with the larger root font on big monitors.
    <Component
      className={cn(
        'mx-auto w-full max-w-[77.5rem]',
        'pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))]',
        'sm:pl-[max(1.5rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))]',
        'lg:pl-[max(2rem,env(safe-area-inset-left))] lg:pr-[max(2rem,env(safe-area-inset-right))]',
        className
      )}
    >
      {children}
    </Component>
  );
}
