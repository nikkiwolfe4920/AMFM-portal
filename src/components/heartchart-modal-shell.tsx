"use client";

import { useRef } from "react";
import type { ComponentProps, ReactElement, ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type HeartChartModalShellSize = "sm" | "md" | "lg" | "xl";

type HeartChartModalShellProps = Omit<ComponentProps<typeof Dialog>, "children"> & {
  title: string;
  trigger: ReactElement;
  children: ReactNode;
  description?: string;
  headerContent?: ReactNode;
  footer?: ReactNode;
  size?: HeartChartModalShellSize;
  framed?: boolean;
  showDivider?: boolean;
  className?: string;
  bodyClassName?: string;
  footerClassName?: string;
  headerClassName?: string;
};

const modalSizeClasses: Record<HeartChartModalShellSize, string> = {
  sm: "sm:max-w-modal-sm",
  md: "sm:max-w-modal-md",
  lg: "sm:max-w-modal-lg",
  xl: "sm:max-w-modal-xl",
};

const modalGridRowClasses = {
  withDivider: "grid-rows-modal-with-divider",
  withoutDivider: "grid-rows-modal-no-divider",
};

export function HeartChartModalShell({
  title,
  trigger,
  children,
  description,
  headerContent,
  footer,
  size = "md",
  framed = true,
  showDivider = true,
  className,
  bodyClassName,
  footerClassName,
  headerClassName,
  ...dialogProps
}: HeartChartModalShellProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRowsClass = showDivider
    ? modalGridRowClasses.withDivider
    : modalGridRowClasses.withoutDivider;

  const content = (
    <>
      <DialogHeader className={cn("gap-4 px-6 pt-6 pb-5 pr-14", headerClassName)}>
        <DialogTitle
          ref={titleRef}
          tabIndex={-1}
          className="text-xl font-semibold outline-none"
        >
          {title}
        </DialogTitle>
        <DialogDescription className="sr-only">
          {description ?? `${title} modal.`}
        </DialogDescription>
        {headerContent}
      </DialogHeader>
      {showDivider && (
        <div
          aria-hidden="true"
          data-slot="heartchart-modal-divider"
          className="border-border-secondary border-t"
        />
      )}
      <div
        data-slot="heartchart-modal-body"
        className={cn("min-h-0 overflow-y-auto p-6", bodyClassName)}
      >
        {children}
      </div>
      {footer && (
        <div
          data-slot="heartchart-modal-footer"
          className={cn(
            "border-border-secondary bg-secondary border-t px-6 py-4 sm:px-8 sm:py-6",
            footerClassName
          )}
        >
          <DialogFooter className="items-center sm:items-center sm:justify-end">
            {footer}
          </DialogFooter>
        </div>
      )}
    </>
  );

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        overlayClassName="bg-overlay/85 backdrop-blur-sm"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          titleRef.current?.focus();
        }}
        className={cn(
          "max-h-modal-shell border-0 p-0 shadow-2xl",
          gridRowsClass,
          framed && "p-2",
          modalSizeClasses[size],
          className
        )}
      >
        {framed ? (
          <div
            data-slot="heartchart-modal-frame"
            className={cn(
              "border-border-secondary grid max-h-modal-frame overflow-hidden rounded-md border bg-background",
              gridRowsClass
            )}
          >
            {content}
          </div>
        ) : (
          content
        )}
      </DialogContent>
    </Dialog>
  );
}
