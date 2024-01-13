import cl from "clsx";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";

interface ScrollButtonProps {
  hidden: boolean;
  onClick: () => void;
  dir: "left" | "right";
}

function ScrollButton({ hidden, onClick, dir }: ScrollButtonProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cl("navds-tabs__scroll-button", {
        "navds-tabs__scroll-button--hidden": hidden,
      })}
      onClick={onClick}
    >
      {dir === "left" ? (
        <ChevronLeftIcon title="scroll tilbake" />
      ) : (
        <ChevronRightIcon title="scroll neste" />
      )}
    </div>
  );
}

export default ScrollButton;
