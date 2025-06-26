import { CalendarIcon } from "@navikt/aksel-icons";
import { BoxNew } from "@navikt/ds-react";
import styles from "./MonthBubble.module.css";

export default function () {
  return (
    <BoxNew
      className={styles.bubble}
      width="48px"
      height="48px"
      borderWidth="1"
      borderColor="neutral-subtle"
    >
      <CalendarIcon aria-hidden="true" width={24} height={24} />
    </BoxNew>
  );
}
