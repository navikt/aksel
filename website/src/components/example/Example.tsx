import React from "react";
import cn from "classnames";

import OverflowDetector from "../overflow-detector/OverflowDetector";

import "./styles.less";

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
    className={cn("example", className, {
      "example--greyBg": greyBg,
    })}
    role="region"
    aria-label="Kode-eksempel"
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
