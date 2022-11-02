import React, { ReactNode } from "react";

export const parseRows = (rowChildren: ReactNode[]) => {
  return rowChildren?.map((r: ReactNode) => {
    let periods = [];
    if (React.isValidElement(r) && r?.props?.children) {
      if (Array.isArray(r.props.children)) {
        for (let i = 0; i < r.props.children.length; i++) {
          const p = r.props.children[i];

          periods.push({
            start: p?.props?.start,
            end: p?.props?.end,
            status: p?.props?.status || "default",
            onSelectPeriod: p.props?.onSelectPeriod,
            label: r.props.label,
            icon: p.props.icon,
            children: p.props.children,
          });
        }
      } else {
        periods.push({
          start: r.props.children.props.start,
          end: r.props.children.props.end,
          status: r.props.children.props?.status || "default",
          onSelectPeriod: r.props.children.props?.onSelectPeriod,
          label: r.props.label,
          icon: r.props.children.props?.icon,
          children: r.props.children.props?.children,
        });
      }
      return { label: r.props.label, icon: r.props.icon, periods: periods };
    }
    if (React.isValidElement(r)) {
      return { periods: [] };
    }
  });
};
