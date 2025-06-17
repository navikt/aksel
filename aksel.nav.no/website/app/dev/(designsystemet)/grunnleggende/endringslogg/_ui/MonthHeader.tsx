"use client";

import { Box, HStack, Heading, VStack } from "@navikt/ds-react";
import { capitalize } from "@/utils";
import styles from "./Changelog.module.css";
import MonthBubble from "./MonthBubble";

type Props = {
  monthAndYear: string;
  index: number;
};

export default function MonthHeader({ monthAndYear, index }: Props) {
  return (
    <dt className={styles.monthHeader}>
      {/* TODO: [endringslogg] Remove timeline and add divider on mobile */}
      <HStack className={styles.monthSpacer}>
        {index > 0 && (
          <VStack width="48px" align="center">
            <Box.New flexGrow="1" className={styles.timeline} />
          </VStack>
        )}
      </HStack>
      <HStack wrap={false}>
        <VStack asChild width="48px" align="center">
          <MonthBubble />
        </VStack>
        <VStack asChild justify="center" paddingInline="space-12 0">
          <Heading as="div" size="small">
            {capitalize(monthAndYear)}
          </Heading>
        </VStack>
      </HStack>
    </dt>
  );
}
