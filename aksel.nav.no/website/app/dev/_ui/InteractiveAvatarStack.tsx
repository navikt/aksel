"use client";

import { useRef, useState } from "react";
import { Button } from "@navikt/ds-react";
import { Popover, PopoverContent } from "@navikt/ds-react/Popover";
import { type Avatar } from "./Avatar";

export const InteractiveAvatarStack = ({
  popoverContent,
  children,
}: {
  popoverContent: Avatar;
  children: React.ReactNode;
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
        <PopoverContent>{popoverContent.description}</PopoverContent>
      </Popover>
    </>
  );
};
