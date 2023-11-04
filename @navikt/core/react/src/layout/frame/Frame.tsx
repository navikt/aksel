import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../../util/OverridableComponent";

const widthLookup = {
  content: "768px",
  laptop: "1280px",
  "laptop-xl": "1440px",
  desktop: "1920px",
};

export interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  width: keyof typeof widthLookup;
}

export const Frame: OverridableComponent<FrameProps, HTMLDivElement> =
  forwardRef(
    (
      { as: Component = "div", width, className, style: _style, ...rest },
      ref
    ) => {
      const style: React.CSSProperties = {
        ..._style,
        "--__ac-frame-width": width ? widthLookup[width] : undefined,
      };

      return (
        <Component
          {...rest}
          className={cl("navds-frame", className)}
          ref={ref}
          style={style}
        />
      );
    }
  );
