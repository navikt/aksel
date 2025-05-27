import { CalendarIcon } from "@navikt/aksel-icons";
import { Box } from "@navikt/ds-react";
import styles from "./MonthBubble.module.css";

export default function () {
  return (
    <Box.New
      className={styles.bubble}
      width="48px"
      height="48px"
      borderWidth="1"
      borderColor="neutral-subtle"
    >
      <CalendarIcon width={24} height={24} />
    </Box.New>
  );
}
