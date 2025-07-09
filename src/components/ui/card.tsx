// components/ui/card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

// Main Card container
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      // --- VERY OBVIOUS TEST: TEMPORARILY using bg-red-500/50 for transparency check ---
      // This should make the card a semi-transparent red if styles are applying.
      className={cn(
        "bg-red-500/50 backdrop-blur-md", // Temporarily set to semi-transparent red and strong blur
        "text-white flex flex-col gap-6 rounded-xl border border-border shadow-sm transition-colors duration-300", // text-white for visibility on red
        className
      )}
      {...props}
    />
  );
}

// Header section (title + optional action)
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min items-start gap-1.5 px-6 pt-6",
        className
      )}
      {...props}
    />
  );
}

// Title of the card
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-lg font-semibold leading-tight", className)}
      {...props}
    />
  );
}

// Optional subtitle/description
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-white/80", className)} // Using white/80 for visibility
      {...props}
    />
  );
}

// For placing an action element like a button in top-right
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

// Content area of the card
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 pb-6", className)}
      {...props}
    />
  );
}

// Footer, often used for buttons or summary
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center justify-between gap-2 px-6 py-4 border-t border-border", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};