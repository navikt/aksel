import { ComponentType } from "react";
import styles from "./examples.module.css";
import cl from "classnames";

export const withDsExample = (
  Component: ComponentType,
  variant?: "full" | "inverted"
) => {
  const DsHOC = (props: any) => (
    <div
      className={cl(styles.container, {
        "bg-gray-900": variant === "inverted",
      })}
    >
      <div id="ds-example" className={cl({ "w-full": variant === "full" })}>
        <Component {...props} />
      </div>
    </div>
  );

  if (Component.displayName) {
    DsHOC.displayName = `DsExample${Component.displayName}`;
  }

  return DsHOC;
};
