import { Detail } from "@navikt/ds-react";
import styles from "./Typography.module.css";

function Code({
  children,
}: Pick<React.HTMLAttributes<HTMLElement>, "children">) {
  return (
    <Detail as="code" weight="semibold" className={styles.typoCode}>
      {children}
    </Detail>
  );
}

export { Code };
