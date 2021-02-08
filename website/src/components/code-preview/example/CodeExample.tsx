import cn from "classnames";
import React, { useRef, useState } from "react";
import OverflowDetector from "../../overflow-detector/OverflowDetector";
import ColorSwitch from "../../color-switch/ColorSwitch";
import "./index.css";

interface ExampleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  colorPicker?: boolean;
}

const Example = ({
  children,
  className,
  colorPicker = false,
  ...props
}: ExampleProps) => {
  const [color, setColor] = useState("#ffffff");
  const backgroundColors = useRef(["#f1f1f1", "#ffffff"]);

  return (
    <div className={cn("codeexample", className)} role="region" {...props}>
      <OverflowDetector>
        <div style={{ backgroundColor: color }} className="codeexample__inner">
          {children}
        </div>
        {colorPicker && (
          <div
            className="codeexample__options"
            style={{ backgroundColor: color }}
          >
            Bakgrunnsfarge {color}
            <ColorSwitch
              colors={backgroundColors.current}
              onChange={(c) => setColor(c)}
            />
          </div>
        )}
      </OverflowDetector>
    </div>
  );
};

export default Example;
