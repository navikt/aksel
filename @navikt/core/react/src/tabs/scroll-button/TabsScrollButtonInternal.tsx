import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { cl } from "../../utils/helpers";

interface TabsScrollButtonInternalProps {
  hidden: boolean;
  onClick: () => void;
  dir: "left" | "right";
}

function TabsScrollButtonInternal({
  hidden,
  onClick,
  dir,
}: TabsScrollButtonInternalProps) {
  return (
    <div
      className={cl("aksel-tabs__scroll-button", {
        "aksel-tabs__scroll-button--hidden": hidden,
      })}
      onClick={onClick}
      aria-hidden
    >
      {dir === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </div>
  );
}

export { TabsScrollButtonInternal };
export type { TabsScrollButtonInternalProps };
