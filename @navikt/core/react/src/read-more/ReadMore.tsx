import React, { forwardRef, useState } from "react";
import cl from "clsx";
import { Expand } from "@navikt/ds-icons";
import { BodyLong } from "../typography";
import { ExpandFilled } from "@navikt/ds-icons";
import AnimateHeight from "../util/AnimateHeight";
import { useSizeManager } from "../aksel-provider/hooks";

export interface ReadMoreProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Content inside ReadMore
   */
  children: React.ReactNode;
  /**
   * ReadMore header content
   */
  header: React.ReactNode;
  /**
   * Opens component if 'true', closes if 'false'
   * Using this props removes automatic control of open-state
   */
  open?: boolean;
  /**
   * Defaults the accordion to opened state
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Changes fontsize for content
   * @default false
   */
  size?: "medium" | "small";
}

export const ReadMore = forwardRef<HTMLButtonElement, ReadMoreProps>(
  (
    {
      className,
      header,
      children,
      open,
      defaultOpen = false,
      onClick,
      size,
      ...rest
    },
    ref
  ) => {
    const sizeCtx = useSizeManager<ReadMoreProps["size"]>(size);
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);

    const isOpened = open ?? internalOpen;

    return (
      <div
        className={cl(
          "navds-read-more",
          `navds-read-more--${sizeCtx}`,
          className,
          { "navds-read-more--open": isOpened }
        )}
      >
        <button
          {...rest}
          ref={ref}
          type="button"
          className={cl("navds-read-more__button", "navds-body-short", {
            "navds-body-short--small": sizeCtx === "small",
          })}
          onClick={(e) => {
            if (open === undefined) {
              setInternalOpen((isOpen) => !isOpen);
            }
            onClick?.(e);
          }}
          aria-expanded={isOpened}
        >
          <Expand className="navds-read-more__expand-icon" aria-hidden />
          <ExpandFilled
            className="navds-read-more__expand-icon navds-read-more__expand-icon--filled"
            aria-hidden
          />
          <span>{header}</span>
        </button>
        <AnimateHeight height={isOpened ? "auto" : 0} duration={250}>
          <BodyLong
            as="div"
            className="navds-read-more__content"
            size={sizeCtx}
          >
            {children}
          </BodyLong>
        </AnimateHeight>
      </div>
    );
  }
);

export default ReadMore;
