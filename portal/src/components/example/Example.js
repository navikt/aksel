import React from "react";
import cn from "classnames";

import OverflowDetector from "../overflow-detector/OverflowDetector";

import "./styles.less";

const cls = (className, greyBg) =>
  cn("example", className, {
    "example--greyBg": greyBg,
  });

// eslint-disable-next-line object-curly-newline
const Example = ({ children, className, noscroll, greyBg, ...rest }) => (
  <div
    className={cls(className, greyBg)}
    role="region"
    aria-label="Eksempel"
    {...rest}
  >
    {noscroll ? (
      <div className="example__inner">{children}</div>
    ) : (
      <OverflowDetector>
        <div className="example__inner">{children}</div>
      </OverflowDetector>
    )}
  </div>
);

export default Example;
