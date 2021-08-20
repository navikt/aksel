import React from "react";
import cl from "classnames";

export * from "./OverridableComponent";

interface Props {
  [key: string]: any;
}

const mergeProps = (...args: Props[]) => {
  let result: Props = {};
  for (let props of args) {
    for (let key in props) {
      if (
        key === "className" &&
        typeof result.className === "string" &&
        typeof props.className === "string"
      ) {
        result[key] = cl(result.className, props.className);
      } else {
        result[key] = props[key];
      }
    }
  }

  return result;
};

interface OverriddenComponentProps {
  children?: React.ReactNode;
}

export const OverriddenComponent = ({
  children,
  ...props
}: OverriddenComponentProps) => {
  const child = React.Children.only(children);
  if (React.isValidElement(child)) {
    return React.cloneElement(child, mergeProps(child.props, props));
  } else {
    console.error(
      "Component with override=true received invalid react element as child."
    );
    return null;
  }
};

export const omit = (obj: object, props: string[]) =>
  Object.entries(obj)
    .filter(([key]) => !props.includes(key))
    .reduce(
      (obj, [key, value]) => ({
        ...obj,
        [key]: value,
      }),
      {}
    );
