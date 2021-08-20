import React, { forwardRef, HTMLAttributes } from "react";
import { Guide, GuideProps } from "../index";
import cl from "classnames";

const guideCls = (className, poster, compact) =>
  cl("navds-guide-panel", className, {
    "navds-guide-panel--poster": poster,
    "navds-guide-panel--compact": compact,
  });

export interface GuidePanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * GuidePanel content
   */
  children: React.ReactNode;
  /**
   * Custom svg/img element
   */
  illustration: React.ReactNode;
  /**
   * Allows setting props on Guide-element
   */
  guideProps?: Partial<GuideProps>;
  /**
   * Poster positions guide-illustation above content
   * @default false, renders illustation left of content
   */
  poster?: boolean;
  /**
   * Compact version of component, guide-illustration is positioned overlapping over panel-border
   * @default false
   */
  compact?: boolean;
  /**
   * Change color of panel-border and illustration background
   * Is set with inline style, so css-variables can be used
   */
  color?: string;
}

const GuidePanel = forwardRef<HTMLDivElement, GuidePanelProps>(
  (
    {
      children,
      className,
      guideProps,
      illustration,
      compact = false,
      poster = false,
      color,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={!!color ? { borderColor: `${color}` } : {}}
        className={guideCls(className, poster, compact)}
        {...rest}
      >
        <Guide
          {...guideProps}
          size={poster ? "m" : "s"}
          illustration={illustration}
          color={color}
        />
        <div className="navds-guide-panel__content">{children}</div>
      </div>
    );
  }
);

export default GuidePanel;
