import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

const neutralButtonClasses =
  "border border-button-outline-border bg-button-outline-bg text-button-outline-fg hover:bg-accent focus-visible:border-ring [&>svg]:text-button-outline-icon disabled:opacity-100 [&:disabled:not([data-loading])]:bg-muted [&:disabled:not([data-loading])]:text-fg-disabled [&:disabled:not([data-loading])]:shadow-xs [&:disabled:not([data-loading])>svg]:text-fg-disabled";

const neutralOutlineClasses = `${neutralButtonClasses} shadow-xs`;

const reversedOutlineClasses =
  "border border-button-outline-reversed-border bg-button-outline-reversed-bg text-button-outline-reversed-fg shadow-none hover:bg-button-outline-reversed-hover-bg hover:text-button-outline-reversed-fg focus-visible:border-button-outline-reversed-border [&>svg]:text-button-outline-reversed-icon disabled:opacity-50";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-5 shrink-0 [&>svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-white/12 shadow-button-inset hover:bg-text-brand focus-visible:border-white/12 focus-visible:ring-border-brand focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-100 [&>svg]:text-button-primary-icon [&:disabled:not([data-loading])]:bg-muted [&:disabled:not([data-loading])]:border-border-secondary [&:disabled:not([data-loading])]:text-fg-disabled [&:disabled:not([data-loading])]:shadow-xs [&:disabled:not([data-loading])>svg]:text-fg-disabled",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: neutralOutlineClasses,
        outlineReversed: reversedOutlineClasses,
        utilitySegment:
          `${neutralButtonClasses} shadow-none border-l border-y-0 border-r-0`,
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-text-brand underline-offset-4 hover:underline",
      },
      size: {
        compact: "h-[38px] rounded-md gap-1.5 px-3 py-1.5 text-sm has-[>svg]:px-3",
        control: "h-11 rounded-md gap-1.5 px-3.5 py-2.5 text-sm has-[>svg]:px-3.5",
        controlSegment: "h-full rounded-r-md rounded-l-none gap-1.5 px-3.5 py-0 text-sm has-[>svg]:px-3.5",
        default: "h-[46px] px-4 py-2 text-base has-[>svg]:px-3",
        inline: "h-auto gap-1.5 px-0 py-0 text-sm has-[>svg]:px-0",
        sm: "h-[42px] rounded-md gap-1.5 px-3 py-2 text-sm has-[>svg]:px-3",
        lg: "h-[50px] rounded-md px-6 py-2.5 text-base has-[>svg]:px-4",
        icon: "size-9 text-sm",
        iconLg: "size-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> &
  (
    | {
        asChild?: false;
        loading?: boolean;
      }
    | {
        asChild: true;
        loading?: false;
      }
  );

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  if (asChild && loading) {
    throw new Error("Button does not support loading when asChild is true");
  }

  const Comp = asChild ? Slot : "button";
  const resolvedVariant = variant ?? "default";
  const resolvedSize =
    size ?? (resolvedVariant === "link" ? "inline" : undefined);

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size: resolvedSize, className }),
        loading &&
          resolvedVariant === "default" &&
          "bg-text-brand hover:bg-text-brand"
      )}
      disabled={loading ? true : disabled}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && <Loader2Icon className="animate-spin" aria-hidden="true" />}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
