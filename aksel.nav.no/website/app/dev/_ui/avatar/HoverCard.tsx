"use client";

import { ReactNode, useRef, useState } from "react";
import { Button } from "@navikt/ds-react";
import { Popover, PopoverContent } from "@navikt/ds-react/Popover";

export const HoverCard = ({
  popoverContent,
  children,
}: {
  popoverContent: ReactNode;
  children: ReactNode;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openState, setOpenState] = useState(false);

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpenState(!openState)}
        aria-expanded={openState}
        variant="tertiary-neutral"
      >
        {children}
      </Button>
      <Popover
        open={openState}
        onClose={() => setOpenState(false)}
        anchorEl={buttonRef.current}
      >
        <PopoverContent>{popoverContent}</PopoverContent>
      </Popover>
    </>
  );
};
