import { Detail } from "@navikt/ds-react";
import { cl } from "@/ui-utils/className";
import styles from "./Typography.module.css";

function Code({
  children,
  as = "code",
  className,
  highlighted,
  strikethrough,
}: Pick<React.HTMLAttributes<HTMLElement>, "children"> & {
  as?: React.ElementType;
  highlighted?: boolean;
  strikethrough?: boolean;
  className?: string;
}) {
  return (
    <Detail
      as={as}
      weight="semibold"
      className={cl(styles.typoCode, className)}
      data-highlighted={highlighted}
      data-strikethrough={strikethrough}
    >
      {children}
    </Detail>
  );
}

export { Code };
