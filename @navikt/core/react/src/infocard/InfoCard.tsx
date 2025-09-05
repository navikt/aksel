import React, { forwardRef, useRef, useState } from "react";
import { InformationSquareFillIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../theme/Theme";
import { AkselColor } from "../types";
import { Heading } from "../typography";
import { createContext } from "../util/create-context";
import {
  useClientLayoutEffect,
  useControllableState,
  useMergeRefs,
} from "../util/hooks";
import { inertValue } from "./collapsible/inertValue";
import { useOpenChangeComplete } from "./collapsible/useOpenChangeComplete";

// const inertValue = parseInt(version.split(".")[0]) > 18 ? true : ""; // Support for inert was added in React 19

type InfoCardContext = {
  size: "medium" | "small";
  open: boolean;
  toggleOpen: (newState?: boolean) => void;
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
  /**
   * Controlled open state
   */
  open?: boolean;
  /**
   * Callback fired when the open state changes
   */
  onOpenChange?: (open: boolean) => void;
}

export const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
  (
    {
      children,
      className,
      size = "medium",
      "data-color": dataColor = "info",
      open: openProp,
      onOpenChange,
      ...restProps
    }: InfoCardProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();

    const contentRef = React.useRef<HTMLDivElement | null>(null);

    const [open, setOpen] = useControllableState({
      value: openProp,
      defaultValue: false,
      onChange: onOpenChange,
    });

    const handleExpandToggle = (newState?: boolean) => {
      if (newState || open) {
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

type Height = number | undefined;
// const COLLAPSED_HEIGHT = 120;

export const InfoCardCollapsibleContent = forwardRef<
  HTMLDivElement,
  InfoCardCollapsibleContentProps
>(
  (
    { children, className, ...restProps }: InfoCardCollapsibleContentProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    const panelRef = useRef<HTMLDivElement | null>(null);
    const { open, contentRef } = useInfoCardContext();
    const shouldCancelInitialOpenTransitionRef = useRef(open);

    const mergedRef = useMergeRefs(forwardedRef, contentRef, panelRef);

    const [height, setDimensions] = useState<Height>();

    useClientLayoutEffect(() => {
      if (!panelRef.current) {
        return;
      }
      if (shouldCancelInitialOpenTransitionRef.current) {
        shouldCancelInitialOpenTransitionRef.current = false;
        return;
      }

      if (open) {
        setDimensions(panelRef.current.scrollHeight);
      }
    }, [open]);

    useOpenChangeComplete({
      open,
      ref: contentRef,
      onComplete: () => {
        if (!open) {
          setDimensions(undefined);
        }
      },
    });

    const style: React.CSSProperties = {
      "--__axc-info-card-height": height ? `${height}px` : undefined,
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
        tabIndex={-1}
        style={style}
        /* @ts-expect-error: React does not handle inert well across versions. */
        inert={inertValue(!open)}
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
      onClick={() => toggleOpen()}
    >
      {open ? "Vis mindre" : "Vis mer"}
    </button>
  );
});

export default InfoCard;
