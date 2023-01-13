import { omit } from "@navikt/ds-react";
import React, { ReactNode } from "react";
import { Period } from "./types.external";

type ParsedChild = {
  label?: string;
  icon?: ReactNode;
  headingTag: string;
  periods: Omit<Period, "id" | "endInclusive">[];
  restProps: any;
  ref: any;
};

export const parseRows = (rowChildren: ReactNode[]) => {
  let parsedChildren: ParsedChild[] = [];
  rowChildren?.forEach((r: ReactNode) => {
    let periods = [];
    if (React.isValidElement(r) && r?.props?.children) {
      if (Array.isArray(r.props.children)) {
        for (let i = 0; i < r.props.children.length; i++) {
          const p = r.props.children[i];

          periods.push({
            start: p?.props?.start,
            end: p?.props?.end,
            status: p?.props?.status || "neutral",
            onSelectPeriod: p.props?.onSelectPeriod,
            label: r.props.label,
            icon: p.props.icon,
            children: p.props.children,
            isActive: p.props.isActive,
            statusLabel: p.props.statusLabel,
            restProps: omit(p.props, [
              "start",
              "end",
              "status",
              "onSelectPeriod",
              "label",
              "icon",
              "children",
              "isActive",
              "statusLabel",
            ]),
            ref: p?.ref,
          });
        }
      } else {
        periods.push({
          start: r.props.children.props.start,
          end: r.props.children.props.end,
          status: r.props.children.props?.status || "neutral",
          onSelectPeriod: r.props.children.props?.onSelectPeriod,
          label: r.props.label,
          icon: r.props.children.props?.icon,
          children: r.props.children.props?.children,
          statusLabel: r.props.children.props?.statusLabel,
          restProps: omit(r.props.children.props, [
            "start",
            "end",
            "status",
            "onSelectPeriod",
            "label",
            "icon",
            "children",
            "isActive",
            "statusLabel",
          ]),
          ref: r.props?.children?.ref,
        });
      }
      parsedChildren.push({
        label: r.props.label,
        icon: r.props.icon,
        headingTag: r.props.headingTag,
        periods: periods,
        restProps: omit(r.props, ["label", "icon", "headingTag"]),
        ref: (r as any)?.ref,
      });
    }
  });

  return parsedChildren;
};
