import React from "react";
import { HeadRow, useDayPicker } from "react-day-picker";

/** Render the table head. */
export function TableHead(): JSX.Element {
  const { classNames, styles, components } = useDayPicker();
  const HeadRowComponent = components?.HeadRow ?? HeadRow;
  return (
    <thead style={styles.head} className={classNames.head} aria-hidden>
      <HeadRowComponent />
    </thead>
  );
}
