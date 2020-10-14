import React, { useRef, useState, useEffect } from "react";
import classnames from "classnames";

import "./styles.less";

const overflowCls = (left, right) =>
  classnames("overflow-detector", {
    "overflow-detector--shadow-left": left,
    "overflow-detector--shadow-right": right,
  });

const OverflowDetector = ({ ...props }) => {
  const scroller = useRef();
  const inner = useRef();

  const [overflowLeft, setOverflowLeft] = useState(false);
  const [overflowRight, setOverflowRight] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", checkOverflow);
    checkOverflow();
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const checkOverflow = () => {
    const scr = scroller.current;
    const inn = inner.current;

    if (scr.offsetWidth < inn.offsetWidth) {
      if (scr.scrollLeft !== 0) {
        setOverflowLeft(true);
      }
      if (scr.scrollLeft + scr.offsetWidth < inn.offsetWidth) {
        setOverflowRight(true);
      }
    }
  };

  const scrollAttr =
    overflowRight || overflowLeft
      ? {
          tabIndex: "0",
          role: "region",
          "aria-label": "Eksempel",
        }
      : undefined;

  return (
    <div className={overflowCls(overflowLeft, overflowRight)}>
      <div
        className="overflow-detector__scroller"
        onScroll={checkOverflow}
        ref={scroller}
        {...scrollAttr}
      >
        <div className="overflow-detector__inner" ref={inner}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default OverflowDetector;
