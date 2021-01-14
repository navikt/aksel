import React, { CSSProperties } from "react";
import cn from "classnames";

import OverflowDetector from "../overflow-detector/OverflowDetector";

import "./styles.less";

interface ExampleProps {
  style?: CSSProperties;
  children: React.ReactNode;
  className?: string;
  noScroll?: boolean;
  greyBg?: boolean;
}

const Example = ({
  style,
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
      <div style={style} className="example__inner">
        {children}
      </div>
    ) : (
      <OverflowDetector>
        <div style={style} className="example__inner">
          {children}
        </div>
      </OverflowDetector>
    )}
  </div>
);

export default Example;
