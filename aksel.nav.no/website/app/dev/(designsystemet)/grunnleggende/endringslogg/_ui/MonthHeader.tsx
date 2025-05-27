import { Box, HStack, Heading, VStack } from "@navikt/ds-react";
import styles from "./Changelog.module.css";
import MonthBubble from "./MonthBubble";

export default function MonthHeader({ logEntry, index }) {
  return (
    <li key={"month-header-" + index} className={styles["month-header"]}>
      <VStack>
        <HStack className={styles["month-spacer"]}>
          {index > 0 && (
            <VStack width="48px" align="center">
              <Box.New flexGrow="1" className={styles.timeline} />
            </VStack>
          )}
        </HStack>
        <HStack className={styles.nowrap}>
          <VStack width="48px" align="center">
            <MonthBubble />
          </VStack>
          <VStack justify="center" paddingInline="space-12" flexGrow="1">
            <Heading size="small" className={styles.capitalized}>
              {new Date(logEntry.endringsdato).toLocaleDateString("NO", {
                month: "long",
                year: "numeric",
              })}
            </Heading>
          </VStack>
        </HStack>
      </VStack>
    </li>
  );
}
