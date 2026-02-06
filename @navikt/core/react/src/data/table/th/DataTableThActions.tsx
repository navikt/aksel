import React from "react";
import { MenuElipsisVerticalIcon } from "@navikt/aksel-icons";
import { ActionMenu } from "../../../action-menu";
import { Button } from "../../../button";

function DataTableThActions({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  /* TODO: Fix this */
  // @ts-expect-error Temp hack to hide when no children present
  if (!children || !children.filter(Boolean).length) {
    return null;
  }

  return (
    <ActionMenu open={open} onOpenChange={setOpen}>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="tertiary"
          size="small"
          icon={<MenuElipsisVerticalIcon title="Åpne kolonnemeny" />}
          onClick={() => setOpen(!open)}
          data-expanded={open}
          className="aksel-data-table__th-action-button"
        />
      </ActionMenu.Trigger>
      <ActionMenu.Content>{children}</ActionMenu.Content>
    </ActionMenu>
  );
}

export { DataTableThActions };
