import { Detail } from "@navikt/ds-react";
import styles from "./Typography.module.css";

function Code({
  children,
  as = "code",
  highlighted,
}: Pick<React.HTMLAttributes<HTMLElement>, "children"> & {
  as?: React.ElementType;
  highlighted?: boolean;
}) {
  return (
    <Detail
      as={as}
      weight="semibold"
      className={styles.typoCode}
      data-highlighted={highlighted}
    >
      {children}
    </Detail>
  );
}

export { Code };
