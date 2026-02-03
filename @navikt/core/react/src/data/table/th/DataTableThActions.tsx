import React from "react";
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
  sortDirection,
}: {
  sortDirection?: "asc" | "desc" | "none" | false;
}) {
  if (!sortDirection) {
    return null;
  }

  const IconConfig = ICON_CONFIG[sortDirection];

  return (
    <Button
      data-color="neutral"
      variant="tertiary"
      size="small"
      icon={<IconConfig.icon title={IconConfig.title} />}
    />
  );
}

export { DataTableThSortHandle };
