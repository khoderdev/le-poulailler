import { forwardRef, type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

/* ------------------------------------------------------------------ */
/*  Utility                                                            */
/* ------------------------------------------------------------------ */

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ButtonVariant = "primary" | "secondary" | "danger" | "warning" | "ghost";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

interface ButtonBaseProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset — `full` stretches to 100 % width */
  size?: ButtonSize;
  /** Icon element (e.g. `<FiTrash />` from react-icons).
   *  When passed **without** `children`, the button renders as icon-only. */
  icon?: ReactNode;
  /** Side of the icon relative to children text */
  iconPosition?: "left" | "right";
  /** Show a spinner and disable interaction */
  loading?: boolean;
  /** Disable the button */
  disabled?: boolean;
  /** Extra Tailwind classes merged onto the root element */
  className?: string;
  children?: ReactNode;
}

/** Renders a native `<button>` */
interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> {
  href?: never;
}

/** Renders an `<a>` tag styled as a button */
interface ButtonAsLink extends ButtonBaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> {
  href: string;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/* ------------------------------------------------------------------ */
/*  Style maps (Tailwind-only — colors reference @theme tokens)        */
/* ------------------------------------------------------------------ */

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-sm hover:bg-primary-hover active:bg-primary-active focus-visible:ring-primary/40",
  secondary: "bg-secondary text-white shadow-sm hover:bg-secondary-hover active:bg-secondary-active focus-visible:ring-secondary/40",
  danger: "bg-danger text-white shadow-sm hover:bg-danger-hover active:bg-danger-active focus-visible:ring-danger/40",
  warning: "bg-warning text-white shadow-sm hover:bg-warning-hover active:bg-warning-active focus-visible:ring-warning/40",
  ghost: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus-visible:ring-gray-400/40"
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-7  px-2.5 text-xs  gap-1",
  sm: "h-8  px-3   text-xs  gap-1.5",
  md: "h-9  px-4   text-sm  gap-2",
  lg: "h-10 px-5   text-sm  gap-2",
  xl: "h-12 px-6   text-base gap-2.5",
  full: "h-10 px-5   text-base gap-2 w-full"
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  xs: "size-7",
  sm: "size-8",
  md: "size-9",
  lg: "size-10",
  xl: "size-12",
  full: "h-10 w-full"
};

const iconScaleClasses: Record<ButtonSize, string> = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
  full: "text-xl"
};

/* ------------------------------------------------------------------ */
/*  Spinner (inline SVG — no extra dependency)                         */
/* ------------------------------------------------------------------ */

function Spinner() {
  return (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({ variant = "primary", size = "md", icon, iconPosition = "left", loading = false, disabled = false, className, children, ...rest }, ref) => {
  const isIconOnly = !!icon && !children;
  const isDisabled = disabled || loading;

  /* ---- Compose class list ---- */
  const classes = cn("inline-flex items-center justify-center rounded-lg font-medium", "select-none whitespace-nowrap transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", variantClasses[variant], isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size], isDisabled && "pointer-events-none opacity-50", className);

  /* ---- Icon / spinner element ---- */
  const iconEl = (icon || loading) && (
    <span className={cn("shrink-0 inline-flex items-center justify-center", iconScaleClasses[size])} aria-hidden="true">
      {loading ? <Spinner /> : icon}
    </span>
  );

  /* ---- Inner content ---- */
  const content = (
    <>
      {iconPosition === "left" && iconEl}
      {children != null && <span className="truncate">{children}</span>}
      {iconPosition === "right" && iconEl}
    </>
  );

  /* ---- Link mode ---- */
  if ("href" in rest && rest.href != null) {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} aria-disabled={isDisabled || undefined} tabIndex={isDisabled ? -1 : undefined} {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & { href: string })}>
        {content}
      </a>
    );
  }

  /* ---- Button mode (default) ---- */
  const { type = "button", ...nativeProps } = rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>;

  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={classes} disabled={isDisabled} aria-busy={loading || undefined} {...nativeProps}>
      {content}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
