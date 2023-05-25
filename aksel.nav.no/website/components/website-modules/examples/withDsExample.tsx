import { ComponentType } from "react";
import styles from "./examples.module.css";
import cl from "clsx";

export const withDsExample = (
  Component: ComponentType,
  /**
   * Static: Used for dynamic-height examples like ExpansionCard
   */
  variant?: "full" | "inverted" | "static"
) => {
  const DsHOC = (props: any) => (
    <div
      className={cl({
        "bg-gray-900": variant === "inverted",
        [styles.containerStatic]: variant === "static",
        [styles.container]: variant !== "static",
      })}
    >
      <div
        id="ds-example"
        className={cl({
          "w-full": variant === "full",
        })}
      >
        <Component {...props} />
      </div>
    </div>
  );

  if (Component.displayName) {
    DsHOC.displayName = `DsExample${Component.displayName}`;
  }

  return DsHOC;
};
