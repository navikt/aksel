import React, { forwardRef, useRef, useState, version } from "react";
import { InformationSquareFillIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { AkselColor } from "../types";
import { Heading } from "../typography";
import { createContext } from "../util/create-context";
import { useClientLayoutEffect, useMergeRefs } from "../util/hooks";
import { useOpenChangeComplete } from "./collapsible/useOpenChangeComplete";

const inertValue = parseInt(version.split(".")[0]) > 18 ? true : ""; // Support for inert was added in React 19

type InfoCardContext = {
  size: "medium" | "small";
  open: boolean;
  toggleOpen: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const [InfoCardContextProvider, useInfoCardContext] =
  createContext<InfoCardContext>({
    name: "InfoCardContext",
    errorMessage: "useInfoCardContext must be used within an InfoCard",
  });

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Changes the size of the InfoCard.
   * @default "medium"
   */
  size?: InfoCardContext["size"];
  /**
   * Overrides card color
   */
  "data-color"?: AkselColor;
}

export const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
  (
    {
      children,
      className,
      size = "medium",
      "data-color": dataColor = "info",
      ...restProps
    }: InfoCardProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const [open, setOpen] = useState(false);
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    const handleExpandToggle = () => {
      if (open) {
        setOpen(false);
        if (contentRef.current) {
          contentRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
        return;
      }

      setOpen(true);

      /* We need to wait for the "inert"-attrb to dissapear before we can focus the element */
      queueMicrotask(() => {
        contentRef.current?.focus();
      });
    };

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        className={cn(className, "navds-info-card", `navds-info-card--${size}`)}
        data-color={dataColor}
      >
        <InfoCardContextProvider
          size={size}
          open={open}
          toggleOpen={handleExpandToggle}
          contentRef={contentRef}
        >
          {children}
        </InfoCardContextProvider>
      </div>
    );
  },
);

/* ----------------------------- InfoCardHeader ----------------------------- */
interface InfoCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * @default <InformationSquareFillIcon />
   */
  icon?: React.ReactNode;
}

export const InfoCardHeader = forwardRef<HTMLDivElement, InfoCardHeaderProps>(
  (
    { children, className, icon, ...restProps }: InfoCardHeaderProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        className={cn(className, "navds-info-card__header")}
      >
        <div className={cn("navds-info-card__icon")} aria-hidden>
          {icon ?? <InformationSquareFillIcon />}
        </div>
        {children}
      </div>
    );
  },
);

/* ----------------------------- InfoCardTitle ----------------------------- */
interface InfoCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  /**
   * Changes the HTML element used for the title.
   * @default "h2"
   */
  as?: "h2" | "h3" | "h4" | "h5" | "h6";
}

export const InfoCardTitle = forwardRef<HTMLHeadingElement, InfoCardTitleProps>(
  (
    { children, className, as = "h2", ...restProps }: InfoCardTitleProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const { size } = useInfoCardContext();

    return (
      <Heading
        ref={forwardedRef}
        {...restProps}
        as={as}
        size={size === "medium" ? "small" : "xsmall"}
        className={cn(className, "navds-info-card__title")}
      >
        {children}
      </Heading>
    );
  },
);

/* ----------------------------- InfoCardContent ---------------------------- */
interface InfoCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const InfoCardContent = forwardRef<HTMLDivElement, InfoCardContentProps>(
  (
    { children, className, ...restProps }: InfoCardContentProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    return (
      <div
        ref={forwardedRef}
        {...restProps}
        className={cn(className, "navds-info-card__content")}
      >
        {children}
      </div>
    );
  },
);

interface InfoCardCollapsibleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

type Dimension = { width: number | undefined; height: number | undefined };

export const InfoCardCollapsibleContent = forwardRef<
  HTMLDivElement,
  InfoCardCollapsibleContentProps
>(
  (
    { children, className, ...restProps }: InfoCardCollapsibleContentProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const localRef = useRef<HTMLDivElement | null>(null);
    const { open, contentRef } = useInfoCardContext();

    const mergedRef = useMergeRefs(forwardedRef, contentRef, localRef);

    const [{ width, height }, setDimensions] = useState<Dimension>({
      height: 120,
      width: undefined,
    });

    // Measure when opening; clamp to collapsed height when closing
    useClientLayoutEffect(() => {
      const el = localRef.current;
      if (!el) return;

      if (open) {
        setDimensions({
          height: el.scrollHeight,
          width: el.scrollWidth,
        });
      } else {
        setDimensions((prev) => ({
          height: 120,
          width: prev.width,
        }));
      }
    }, [open]);

    /* 137
    201
     */
    useOpenChangeComplete({
      open,
      ref: contentRef,
      onComplete: () => {
        // Keep numeric height after opening to allow closing animation (px -> px).
        // Only reset after closing if you need to, but keep it numeric here.
        if (!open) {
          setDimensions({ height: 120, width: undefined });
        }
      },
    });

    // Always provide a numeric height so the browser can animate it
    const h = height ?? 120;
    const style: React.CSSProperties = {
      "--__axc-info-card-height": `${h}px`,
      "--__axc-info-card-width": width ? `${width}px` : "auto",
    };

    return (
      <div
        ref={mergedRef}
        {...restProps}
        className={cn(
          className,
          "navds-info-card__content",
          "navds-info-card__collapsible-content",
        )}
        data-expanded={open}
        /* inert={!open ? inertValue : false} */
        tabIndex={-1}
        style={style}
      >
        {children}
      </div>
    );
  },
);

interface InfoCardExpandButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const InfoCardExpandButton = forwardRef<
  HTMLButtonElement,
  InfoCardExpandButtonProps
>(({ className, ...restProps }: InfoCardExpandButtonProps, forwardedRef) => {
  const { cn } = useRenameCSS();

  const { open, toggleOpen } = useInfoCardContext();

  return (
    <button
      ref={forwardedRef}
      {...restProps}
      className={cn(className, "navds-info-card__button")}
      onClick={toggleOpen}
    >
      {open ? "Vis mindre" : "Vis mer"}
    </button>
  );
});

export default InfoCard;
