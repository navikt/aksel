import React, { forwardRef, useState } from "react";
import cl from "classnames";
import { Collapse, UnmountClosed } from "react-collapse";
import { Expand } from "@navikt/ds-icons";
import { BodyLong } from "../typography";

export interface DetailsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Content inside Details
   */
  children: React.ReactNode;
  /**
   * Details header content
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

const Details = forwardRef<HTMLButtonElement, DetailsProps>(
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
            "navds-details",
            "navds-body-short",
            `navds-details--${size}`,
            className,
            {
              "navds-details--open": isOpened,
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
          <Expand className="navds-details__expand-icon" aria-hidden />
          <span>{header}</span>
        </button>
        <CollapseComponent isOpened={isOpened}>
          <div className="navds-details__content">
            <BodyLong size={size}>{children}</BodyLong>
          </div>
        </CollapseComponent>
      </div>
    );
  }
);

export default Details;
