import clsx from "clsx";
import { Detail } from "@navikt/ds-react";
import styles from "./Typography.module.css";

function Code({
  children,
  as = "code",
  className,
  highlighted,
}: Pick<React.HTMLAttributes<HTMLElement>, "children"> & {
  as?: React.ElementType;
  highlighted?: boolean;
  className?: string;
}) {
  return (
    <Detail
      as={as}
      weight="semibold"
      className={clsx(styles.typoCode, className)}
      data-highlighted={highlighted}
    >
      {children}
    </Detail>
  );
}

export { Code };
