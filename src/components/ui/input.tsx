import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styling using theme variables
        "flex h-9 w-full min-w-0 rounded-md border border-input bg-input text-foreground px-3 py-1 text-base md:text-sm shadow-sm outline-none transition-all duration-200",
        
        // Placeholder, selection, and file upload styles
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground file:text-foreground file:bg-transparent file:border-0 file:h-7 file:text-sm file:font-medium file:inline-flex",
        
        // Focus ring and error state
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",

        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",

        // Optional extra classes
        className
      )}
      {...props}
    />
  );
}

export { Input };
