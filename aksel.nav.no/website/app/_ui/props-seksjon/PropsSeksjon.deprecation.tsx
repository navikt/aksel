"use client";

import { Box } from "@navikt/ds-react";
import styles from "./PropsSeksjon.module.css";

function PropsSeksjonDeprecation({ text }: { text?: string }) {
  if (!text) {
    return null;
  }

  return (
    <li className={`${styles.propsSeksjonLiDeprecated}`}>
      <div className={styles.propsSeksjonLiTitle}>Deprecated:</div>
      <Box marginInline="space-8">{text}</Box>
    </li>
  );
}

export { PropsSeksjonDeprecation };
