import React, { forwardRef, useState } from "react";
import cl from "classnames";
import { Collapse, UnmountClosed } from "react-collapse";
import { Expand } from "@navikt/ds-icons";
import { BodyLong } from "../typography";
import { ExpandFilled } from "@navikt/ds-icons";

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
   * Removes content-element from dom when closed
   * @default false
   */
  renderContentWhenClosed?: boolean;
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
      renderContentWhenClosed = false,
      children,
      open,
      defaultOpen = false,
      onClick,
      size = "medium",
      ...rest
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
    const CollapseComponent = renderContentWhenClosed
      ? Collapse
      : UnmountClosed;

    const isOpened = open ?? internalOpen;

    return (
      <div>
        <button
          type="button"
          {...rest}
          className={cl(
            "navds-read-more",
            "navds-body-short",
            `navds-read-more--${size}`,
            className,
            {
              "navds-read-more--open": isOpened,
              "navds-body-short--small": size === "small",
            }
          )}
          onClick={(e) => {
            if (open === undefined) {
              setInternalOpen((isOpen) => !isOpen);
            }
            onClick?.(e);
          }}
          aria-expanded={isOpened}
          ref={ref}
        >
          <Expand className={"navds-read-more__expand-icon"} aria-hidden />
          <ExpandFilled
            className={
              "navds-read-more__expand-icon navds-read-more__expand-icon--filled"
            }
            aria-hidden
          />
          <span>{header}</span>
        </button>
        <CollapseComponent isOpened={isOpened}>
          <div className="navds-read-more__content">
            <BodyLong size={size}>{children}</BodyLong>
          </div>
        </CollapseComponent>
      </div>
    );
  }
);

export default ReadMore;
