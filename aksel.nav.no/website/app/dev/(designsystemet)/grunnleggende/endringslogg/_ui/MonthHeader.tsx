"use client";

import { BoxNew, HStack, Heading, Hide, VStack } from "@navikt/ds-react";
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
      <HStack className={styles.monthSpacer}>
        {index > 0 && (
          <VStack width="48px" align="center">
            <Hide below="sm" asChild>
              <BoxNew flexGrow="1" className={styles.timeline} />
            </Hide>
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
