import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../../../theme/Theme";

interface ScrollButtonProps {
  hidden: boolean;
  onClick: () => void;
  dir: "left" | "right";
}

function ScrollButton({ hidden, onClick, dir }: ScrollButtonProps) {
  const { cn } = useRenameCSS();

  return (
    <div
      className={cn("navds-tabs__scroll-button", {
        "navds-tabs__scroll-button--hidden": hidden,
      })}
      onClick={onClick}
      aria-hidden
    >
      {dir === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </div>
  );
}

export default ScrollButton;
