import React from "react";
import cl from "classnames";

interface PictogramProps {
  front: React.ReactElement<Symbol>;
  back: React.ReactElement<Symbol>;
  isActive: boolean;
  className?: string;
}

const Pictogram = ({ front, back, isActive, className }: PictogramProps) => {
  return (
    <div className={cl("navds-pictogram", className)}>
      <div className={cl("front", isActive ? "front--invert" : null)}>
        {front}
      </div>
      <div className={cl("back", isActive ? "back--invert" : null)}>{back}</div>
    </div>
  );
};

export default Pictogram;
