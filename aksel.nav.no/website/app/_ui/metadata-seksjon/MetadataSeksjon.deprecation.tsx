"use client";

import { BodyShort, Box } from "@navikt/ds-react";
import styles from "./MetadataSeksjon.module.css";

function MetadataSeksjonDeprecation({ text }: { text?: string }) {
  if (!text) {
    return null;
  }

  return (
    <BodyShort
      as="li"
      textColor="subtle"
      data-color="danger"
      className={styles.propsSeksjonLi}
    >
      <div className={styles.propsSeksjonLiTitle}>Deprecated:</div>
      <Box marginInline="space-8">{text}</Box>
    </BodyShort>
  );
}

export { MetadataSeksjonDeprecation };
