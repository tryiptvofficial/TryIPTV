import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-white/[0.12] bg-[#101512] px-3 py-2 text-base pointer-fine:text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/30 aria-invalid:border-red-400 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
