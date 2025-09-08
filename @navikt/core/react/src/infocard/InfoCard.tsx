import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
  hiddenUntilFound: boolean;
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
  /**
   * If true, the content will be hidden with the `hidden="until-found"` attribute when collapsed.
   * @default true
   */
  hiddenUntilFound?: boolean;
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
      hiddenUntilFound = true,
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

    const handleExpandToggle = useCallback(
      (newState?: boolean) => {
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
      },
      [open, setOpen],
    );

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
          hiddenUntilFound={hiddenUntilFound}
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

type Height = number | "auto" | undefined;
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
    const { open, contentRef, hiddenUntilFound, toggleOpen } =
      useInfoCardContext();
    /* Avoid animating first render */
    const shouldCancelInitialOpenTransitionRef = useRef(open);
    /* Avoids first render from animating */
    /* TODO: Look into merging with `shouldCancelInitialOpenTransitionRef` */
    const initialOpenMount = useRef(!open);

    const mergedRef = useMergeRefs(forwardedRef, contentRef, panelRef);

    const [height, setDimensions] = useState<Height>(() =>
      open ? "auto" : undefined,
    );

    useClientLayoutEffect(() => {
      if (!panelRef.current) {
        return;
      }
      console.info("useLayoutEffect", panelRef.current);

      if (shouldCancelInitialOpenTransitionRef.current) {
        shouldCancelInitialOpenTransitionRef.current = false;
        if (open) {
          setDimensions("auto");
        }
        return;
      }

      if (open) {
        setDimensions(panelRef.current.scrollHeight);
        return;
      }

      if (initialOpenMount.current) {
        initialOpenMount.current = false;
        return;
      }

      setDimensions(panelRef.current.scrollHeight);
    }, [open]);

    useOpenChangeComplete({
      open,
      ref: contentRef,
      onComplete: () => {
        if (open) {
          setDimensions("auto");
        } else {
          setDimensions(undefined);
        }
      },
    });

    useClientLayoutEffect(() => {
      const panel = panelRef.current;

      if (!hiddenUntilFound || !panel) {
        return;
      }

      if (!open) {
        /**
         * React only supports a boolean for the `hidden` attribute and forces
         * legit string values to booleans so we have to force it back in the DOM
         * when necessary: https://github.com/facebook/react/issues/24740
         */
        panel.setAttribute("hidden", "until-found");
        panel.style.display = "block";
        panel.style.contentVisibility = "visible";
        return;
      }
      panel.removeAttribute("hidden");
    }, [hiddenUntilFound, panelRef, open]);

    useEffect(
      function registerBeforeMatchListener() {
        console.info("beforematch event fired before");
        const panel = panelRef.current;
        if (!panel) {
          console.info("no panel");
          return undefined;
        }

        function handleBeforeMatch() {
          /* isBeforeMatchRef.current = true; */
          console.info("beforematch event fired");
          toggleOpen(true);
        }

        panel.addEventListener("beforematch", handleBeforeMatch);

        return () => {
          panel.removeEventListener("beforematch", handleBeforeMatch);
        };
      },
      [toggleOpen],
    );

    const style: React.CSSProperties = {
      "--__axc-info-card-height":
        height === undefined
          ? undefined
          : height === "auto"
            ? "auto"
            : `${height}px`,
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
