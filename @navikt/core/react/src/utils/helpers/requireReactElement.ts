import React from "react";

const requireReactElement = <T extends React.ReactNode>(children: T): T => {
  const isReactElement = React.isValidElement(children);

  if (!isReactElement) {
    throw Error(
      `Expected a single React Element child, but got: ${React.Children.toArray(
        children,
      )
        .map((child) =>
          typeof child === "object" &&
          "type" in child &&
          typeof child.type === "string"
            ? child.type
            : typeof child,
        )
        .join(", ")}`,
    );
  }

  return children;
};

export { requireReactElement };
