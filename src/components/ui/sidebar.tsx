"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sidebarVariants = cva(
  "fixed top-0 left-0 h-full bg-background border-r transition-all duration-300 flex flex-col",
  {
    variants: {
      state: {
        open: "w-64",
        closed: "w-20",
      },
    },
    defaultVariants: {
      state: "open",
    },
  }
);

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, state, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={cn(sidebarVariants({ state }), className)}
        {...props}
      />
    );
  }
);
Sidebar.displayName = "Sidebar";

export { Sidebar };