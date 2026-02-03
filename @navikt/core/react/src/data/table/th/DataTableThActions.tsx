import React from "react";
import { MenuElipsisVerticalIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { ActionMenu } from "../../../overlays/action-menu";

function DataTableThActions({ children }: { children?: React.ReactNode }) {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="tertiary"
          size="small"
          icon={<MenuElipsisVerticalIcon title="Åpne kolonnemeny" />}
        />
      </ActionMenu.Trigger>
      <ActionMenu.Content>{children}</ActionMenu.Content>
    </ActionMenu>
  );
}

export { DataTableThActions };
