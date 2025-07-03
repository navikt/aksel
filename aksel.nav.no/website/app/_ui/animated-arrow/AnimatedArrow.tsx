import { SVGProps } from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import styles from "./AnimatedArrow.module.css";

type AnimatedArrowRightProps = SVGProps<SVGSVGElement>;

const AnimatedArrowRight = (props: AnimatedArrowRightProps) => {
  return (
    <ArrowRightIcon
      aria-hidden
      fontSize="1.25rem"
      {...props}
      className={styles.animatedArrow}
    />
  );
};

export { AnimatedArrowRight };
