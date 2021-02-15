import React, { useState } from "react";
import { Popover, Button } from "@navikt/ds-react";
import { placements } from "@popperjs/core";

export const PopoverExample = ({ small = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(true);

  return (
    <>
      <Button
        ref={(el) => setAnchorEl(el)}
        onClick={() => setOpen((open) => !open)}
      >
        Open popover
      </Button>
      <Popover
        anchorEl={anchorEl}
        onClose={() => setOpen(false)}
        open={open}
        size={small ? "small" : "medium"}
      >
        Contents
      </Popover>
    </>
  );
};
