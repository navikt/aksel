import React from "react";
import cn from "classnames";

import OverflowDetector from "../overflow-detector/OverflowDetector";

import "./styles.less";

const cls = (className, greyBg) =>
  cn("example", className, {
    "example--greyBg": greyBg,
  });

interface ExampleProps {
  children: React.ReactNode;
  className?: string;
  noScroll?: boolean;
  greyBg?: boolean;
}

const Example = ({
  children,
  className = "",
  noScroll = false,
  greyBg = false,
  ...props
}: ExampleProps) => (
  <div
    className={cls(className, greyBg)}
    role="region"
    aria-label="Eksempel"
    {...props}
  >
    {noScroll ? (
      <div className="example__inner">{children}</div>
    ) : (
      <OverflowDetector>
        <div className="example__inner">{children}</div>
      </OverflowDetector>
    )}
  </div>
);

export default Example;
