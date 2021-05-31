import React, { forwardRef, HTMLAttributes } from "react";
import { Guide, GuideProps } from "../index";
import cl from "classnames";

const guideCls = (className, poster, compact, theme) =>
  cl("navds-guide-panel", className, `navds-guide-panel--${theme}`, {
    "navds-guide-panel--poster": poster,
    "navds-guide-panel--compact": compact,
  });

export interface GuidePanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Component content
   */
  children?: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  /**
   * Custom svg/img element (preferably svg)
   */
  illustration: React.ReactNode;
  /**
   * Predefined color-themes depending on message wanting to be displayed
   * @default "default"
   */
  theme?: "default" | "success" | "warning" | "error" | "info";
  /**
   * Allows setting props on Guide-element
   */
  guideProps?: GuideProps;
  /**
   * Poster positions guide-illustation over content
   * @default false, renders illustation left of content
   */
  poster?: boolean;
  /**
   * Compact version of component, guide-illustration is positioned overlapping over panel-border
   * @default false
   */
  compact?: boolean;
}

const GuidePanel = forwardRef<HTMLDivElement, GuidePanelProps>(
  (
    {
      children,
      className,
      guideProps,
      theme = "default",
      illustration,
      compact = false,
      poster = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={guideCls(className, poster, compact, theme)}
        {...rest}
      >
        <Guide
          {...guideProps}
          theme={theme}
          size={poster ? "m" : "s"}
          illustration={illustration}
        />
        <div className="navds-guide-panel__content">{children}</div>
      </div>
    );
  }
);

export default GuidePanel;
