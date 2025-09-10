import React, { ReactNode } from "react";
import type { TimelinePeriod, TimelineRow, TimelineRowProps } from "..";
import { omit } from "../../util";
import { getChildRef } from "../../util/getChildRef";
import { Period } from "./types.external";

type TimelineRowPropsWithRef = React.ComponentProps<typeof TimelineRow>;
type TimelinePeriodPropsWithRef = React.ComponentProps<typeof TimelinePeriod>;

type ParsedRow = {
  label: string;
  icon?: React.ReactNode;
  headingTag?: string;
  periods: Omit<Period, "id" | "endInclusive">[];
  restProps: Omit<TimelineRowProps, "label" | "icon" | "headingTag">;
  ref?: React.Ref<HTMLOListElement>;
};

export const parseRows = (rowChildren: ReactNode[]) => {
  const parsedChildren: ParsedRow[] = [];

  rowChildren?.forEach((row: React.ReactNode) => {
    const periods: ParsedRow["periods"] = [];

    if (
      !React.isValidElement<TimelineRowPropsWithRef>(row) ||
      !row.props.children
    ) {
      return;
    }

    React.Children.toArray(row.props.children).forEach((period) => {
      if (!React.isValidElement<TimelinePeriodPropsWithRef>(period)) {
        return;
      }

      periods.push({
        start: period.props.start,
        end: period.props.end,
        status: period.props.status || "neutral",
        onSelectPeriod: period.props.onSelectPeriod,
        icon: period.props.icon,
        children: period.props.children,
        isActive: period.props.isActive,
        statusLabel: period.props.statusLabel,
        restProps: omit(period.props, [
          "start",
          "end",
          "status",
          "onSelectPeriod",
          "icon",
          "children",
          "isActive",
          "statusLabel",
          "placement",
        ]),
        ref: getChildRef(period),
      });
    });

    parsedChildren.push({
      label: row.props.label,
      icon: row.props.icon,
      headingTag: row.props.headingTag,
      periods,
      restProps: omit(row.props, ["label", "icon", "headingTag"]),
      ref: getChildRef(row),
    });
  });

  return parsedChildren;
};
