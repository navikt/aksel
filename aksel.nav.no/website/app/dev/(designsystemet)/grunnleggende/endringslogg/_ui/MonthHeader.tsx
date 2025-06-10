"use client";

import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { Box, HStack, Heading, VStack } from "@navikt/ds-react";
import { ENDRINGSLOGG_QUERYResult } from "@/app/_sanity/query-types";
import styles from "./Changelog.module.css";
import MonthBubble from "./MonthBubble";

type Props = {
  logEntry: ENDRINGSLOGG_QUERYResult[0];
  index: number;
};

export default function MonthHeader({ logEntry, index }: Props) {
  const date = format(new Date(logEntry.endringsdato || 0), "MMMM yyy", {
    locale: nb,
  });

  return (
    <li key={"month-header-" + index} className={styles.monthHeader}>
      <VStack>
        <HStack className={styles.monthSpacer}>
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
              {date}
            </Heading>
          </VStack>
        </HStack>
      </VStack>
    </li>
  );
}
