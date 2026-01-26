"use client";

import { Box, HStack, Heading, Hide, VStack } from "@navikt/ds-react";
import { capitalizeText } from "@/ui-utils/format-text";
import styles from "./Changelog.module.css";
import MonthBubble from "./MonthBubble";

type Props = {
  monthAndYear: string;
  index: number;
};

export default function MonthHeader({ monthAndYear, index }: Props) {
  return (
    <dt className={styles.monthHeader}>
      <HStack className={styles.monthSpacer}>
        {index > 0 && (
          <VStack width="48px" align="center">
            <Hide below="sm" asChild>
              <Box flexGrow="1" className={styles.timeline} />
            </Hide>
          </VStack>
        )}
      </HStack>
      <HStack wrap={false}>
        <VStack asChild width="48px" align="center">
          <MonthBubble />
        </VStack>
        <VStack asChild justify="center" paddingInline="space-12 space-0">
          <Heading as="div" size="small">
            {capitalizeText(monthAndYear)}
          </Heading>
        </VStack>
      </HStack>
    </dt>
  );
}
