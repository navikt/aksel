import React, { useMemo } from "react";
import {
  ArrowsUpDownIcon,
  SortDownIcon,
  SortUpIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../../button";

const ICON_CONFIG = {
  desc: {
    icon: SortDownIcon,
    title: "Sorter stigende",
  },
  asc: {
    icon: SortUpIcon,
    title: "Ingen sortering",
  },
  none: {
    icon: ArrowsUpDownIcon,
    title: "Sorter synkende",
  },
};

function DataTableThSortHandle({
  sortDirection = false,
  onSortChange,
}: {
  sortDirection?: "asc" | "desc" | "none" | false;
  onSortChange?: (direction: "asc" | "desc" | "none", event: Event) => void;
}) {
  const IconConfig = useMemo(() => {
    if (!sortDirection) {
      return null;
    }
    return ICON_CONFIG[sortDirection];
  }, [sortDirection]);

  if (!sortDirection || !IconConfig) {
    return null;
  }

  return (
    <Button
      data-color="neutral"
      variant="tertiary"
      size="small"
      icon={<IconConfig.icon title={IconConfig.title} />}
      onClick={(event) => {
        if (!onSortChange) return;

        /* TODO: This configuration is not a given */
        let newDirection: "asc" | "desc" | "none";
        if (sortDirection === "none") {
          newDirection = "asc";
        } else if (sortDirection === "asc") {
          newDirection = "desc";
        } else {
          newDirection = "none";
        }
        /* TODO: Handle types better */
        onSortChange(newDirection, event as unknown as Event);
      }}
    />
  );
}

export { DataTableThSortHandle };
