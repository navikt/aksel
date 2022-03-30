import React, { forwardRef, useState } from "react";
import cl from "classnames";
import { Collapse, UnmountClosed } from "react-collapse";
import { Expand } from "@navikt/ds-icons";
import { BodyLong } from "../typography";

export interface ReadMoreProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Content inside read more
   */
  children: React.ReactNode;
  /**
   * Read more header content
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
}

const ReadMore = forwardRef<HTMLButtonElement, ReadMoreProps>(
  (
    {
      className,
      header,
      renderContentWhenClosed = false,
      children,
      open,
      defaultOpen = false,
      onClick,
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
      <>
        <button
          type="button"
          {...rest}
          className={cl(
            "navds-read-more",
            "navds-body-short",
            "navds-body-short--small",
            className,
            {
              "navds-read-more--open": isOpened,
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
          <Expand className="navds-read-more__expand-icon" aria-hidden />
          <span>{header}</span>
        </button>
        <CollapseComponent isOpened={isOpened}>
          <div className="navds-read-more__content">
            <BodyLong size="small">{children}</BodyLong>
          </div>
        </CollapseComponent>
      </>
    );
  }
);

export default ReadMore;
