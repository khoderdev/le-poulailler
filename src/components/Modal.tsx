import { forwardRef, memo, useEffect, useCallback, type ReactNode, type HTMLAttributes } from "react";
import { createPortal } from "react-dom";

/* ------------------------------------------------------------------ */
/*  Utility                                                            */
/* ------------------------------------------------------------------ */

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Controls visibility — when `false` the modal is unmounted entirely */
  open: boolean;
  /** Called when the user requests closing (X button, overlay, Escape) */
  onClose: () => void;

  /* ---------- Header ---------- */
  /** Title rendered in the default header.
   *  Ignored when a custom `header` is provided. */
  title?: ReactNode;
  /** Custom header JSX that replaces the default header.
   *  When omitted, the default header (title + X button) renders. */
  header?: ReactNode;
  /** Set to `false` to hide the header entirely (default: `true`) */
  showHeader?: boolean;
  /** Extra classes merged onto the header container */
  headerClassName?: string;

  /* ---------- Footer ---------- */
  /** Custom footer JSX.
   *  When omitted, no footer renders. */
  footer?: ReactNode;
  /** Set to `false` to force-hide the footer even when `footer` is provided
   *  (default: `true`) */
  showFooter?: boolean;
  /** Extra classes merged onto the footer container */
  footerClassName?: string;

  /* ---------- Body ---------- */
  /** Extra classes merged onto the scrollable body container */
  bodyClassName?: string;

  /* ---------- Sizing ---------- */
  /** Preset width — `full` stretches edge-to-edge */
  size?: ModalSize;

  /* ---------- Overlay ---------- */
  /** Extra classes merged onto the backdrop overlay */
  overlayClassName?: string;

  /* ---------- Behaviour ---------- */
  /** Close when clicking the overlay backdrop (default: `true`) */
  closeOnOverlayClick?: boolean;
  /** Close when pressing Escape (default: `true`) */
  closeOnEscape?: boolean;

  /** Modal body content */
  children?: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Style maps                                                         */
/* ------------------------------------------------------------------ */

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-none m-0 rounded-none h-screen"
};

/* ------------------------------------------------------------------ */
/*  Close icon (inline SVG — no extra dependency)                      */
/* ------------------------------------------------------------------ */

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1.25em" height="1.25em" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Default header                                                     */
/* ------------------------------------------------------------------ */

function DefaultHeader({ title, onClose, className }: { title?: ReactNode; onClose: () => void; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between px-5 py-4 border-b border-gray-200", className)}>
      {title != null && <h2 className="text-lg font-semibold text-gray-900 truncate pr-4">{title}</h2>}
      <button type="button" onClick={onClose} className="ml-auto inline-flex items-center justify-center rounded-lg p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/40 focus-visible:ring-offset-1" aria-label="Close">
        <CloseIcon />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const Modal = memo(
  forwardRef<HTMLDivElement, ModalProps>(({ open, onClose, title, header, showHeader = true, headerClassName, footer, showFooter = true, footerClassName, bodyClassName, size = "md", overlayClassName, closeOnOverlayClick = true, closeOnEscape = true, className, children, ...rest }, ref) => {
    /* ---- Escape key handler ---- */
    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (closeOnEscape && e.key === "Escape") {
          e.stopPropagation();
          onClose();
        }
      },
      [closeOnEscape, onClose]
    );

    useEffect(() => {
      if (!open) return;
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, handleKeyDown]);

    /* ---- Lock body scroll when open ---- */
    useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }, [open]);

    /* ---- Don't render anything when closed ---- */
    if (!open) return null;

    /* ---- Derived flags ---- */
    const hasCustomHeader = header !== undefined;
    const renderHeader = showHeader;
    const renderFooter = showFooter && footer !== undefined;

    /* ---- Portal content ---- */
    const modal = (
      <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : undefined}>
        {/* Overlay */}
        <div className={cn("absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity", overlayClassName)} onClick={closeOnOverlayClick ? onClose : undefined} aria-hidden="true" />

        {/* Panel */}
        <div ref={ref} className={cn("relative z-10 flex flex-col w-full bg-white rounded-xl shadow-xl", "max-h-[90vh]", sizeClasses[size], "mx-4", className)} {...rest}>
          {/* Header (fixed at top) */}
          {renderHeader && <div className="shrink-0">{hasCustomHeader ? <div className={cn("px-5 py-4 border-b border-gray-200", headerClassName)}>{header}</div> : <DefaultHeader title={title} onClose={onClose} className={headerClassName} />}</div>}

          {/* Body (scrollable) */}
          <div className={cn("flex-1 overflow-y-auto overscroll-contain px-5 py-4", bodyClassName)}>{children}</div>

          {/* Footer (fixed at bottom) */}
          {renderFooter && <div className={cn("shrink-0 px-5 py-4 border-t border-gray-200", footerClassName)}>{footer}</div>}
        </div>
      </div>
    );

    return createPortal(modal, document.body);
  })
);

Modal.displayName = "Modal";
export default Modal;
