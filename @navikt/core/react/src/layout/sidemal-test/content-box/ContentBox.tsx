import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../../../util";

export interface ContentBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxWidth?: "3xl" | "2xl" | "xl" | "lg";
}

export const ContentBox: OverridableComponent<ContentBoxProps, HTMLDivElement> =
  forwardRef(
    ({ as: Component = "div", className, maxWidth = "xl", ...rest }, ref) => {
      const getMaxWidth = () => {
        return maxWidth === "3xl"
          ? "1920px"
          : maxWidth === "2xl"
          ? "1440px"
          : maxWidth === "xl"
          ? "1280px"
          : "1024px";
      };

      return (
        <>
          <Component
            {...rest}
            ref={ref}
            style={{ "--__ac-contentbox--max-width": getMaxWidth() }}
            className={cl("navds-contentbox", className)}
          />
          <style>
            {`
              .navds-contentbox {
                --__ac-contentbox--max-width: initial;

                margin: 0 auto;
                max-width: var(--__ac-contentbox--max-width);
              }
            `}
          </style>
        </>
      );
    }
  );

export default ContentBox;
