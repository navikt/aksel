import React from "react";
import { HeadRow, useDayPicker } from "react-day-picker";

/**
 * https://github.com/gpbl/react-day-picker/tree/main/src/components/Head
 */
function TableHead(): JSX.Element {
  const { classNames, styles, components } = useDayPicker();
  const HeadRowComponent = components?.HeadRow ?? HeadRow;
  return (
    <thead style={styles.head} className={classNames.head} aria-hidden>
      <HeadRowComponent />
    </thead>
  );
}

export default TableHead;
