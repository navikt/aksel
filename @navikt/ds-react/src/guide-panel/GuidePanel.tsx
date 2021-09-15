import React, { forwardRef, HTMLAttributes } from "react";
import Guide from "./Guide";
import cl from "classnames";

const guideCls = (className, poster) =>
  cl("navds-guide-panel", className, {
    "navds-guide-panel--poster": poster,
  });

export interface GuidePanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * GuidePanel content
   */
  children: React.ReactNode;
  /**
   * Custom svg/img element
   */
  illustration?: React.ReactNode;
  /**
   * Poster positions guide-illustation above content
   * @default false, renders illustation left of content
   */
  poster?: boolean;
}

const GuidePanel = forwardRef<HTMLDivElement, GuidePanelProps>(
  (
    { children, className, illustration, poster = false, color, ...rest },
    ref
  ) => {
    return (
      <div ref={ref} className={guideCls(className, poster)} {...rest}>
        <Guide size={poster ? "medium" : "small"} illustration={illustration} />
        <div className="navds-guide-panel__content">{children}</div>
      </div>
    );
  }
);

export default GuidePanel;
