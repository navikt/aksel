import React, { forwardRef, useEffect } from "react";
import { AccordionMenuItem, AccordionMenuItemType } from "../accordion-menu";
import { useStore } from "./ActiveAnchorStore";

const AccordionAnchorMenuItem: AccordionMenuItemType = forwardRef(
  (props, ref) => {
    const isAnchorActive = useIsAnchorActive(
      props.href && props.href.split("#")[1]
    );

    return (
      <AccordionMenuItem
        {...props}
        ref={ref}
        active={props.active || isAnchorActive}
      />
    );
  }
);

const useIsAnchorActive = (anchor: string | undefined) => {
  const { activeAnchor, registerAnchor, unregisterAnchor } = useStore();

  useEffect(() => {
    if (anchor) {
      const target = document.getElementById(anchor);
      if (target) {
        registerAnchor(anchor);
        return () => {
          unregisterAnchor(anchor);
        };
      }
    }
  }, [anchor, registerAnchor, unregisterAnchor]);

  return (anchor && activeAnchor === anchor) || false;
};

export default AccordionAnchorMenuItem;
