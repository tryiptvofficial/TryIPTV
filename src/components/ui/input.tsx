import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // 16px on touch devices prevents iOS Safari's zoom-on-focus; mouse users keep the compact 14px.
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-white/[0.12] pointer-coarse:min-h-11 bg-[#101512] px-3 py-2 text-base pointer-fine:text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/30 aria-invalid:border-red-400 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
