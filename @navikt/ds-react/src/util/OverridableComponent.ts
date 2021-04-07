import React from "react";

/**
 * A component whose root component can be controlled via a `component` prop.
 */
export interface OverridableComponent<M extends OverridableTypeMap> {
  (props: DefaultComponentProps<M>): React.ReactElement | null;

  <C extends React.ElementType>(
    props: {
      component: C;
    } & OverrideProps<M, C>
  ): React.ReactElement | null;
}

/**
 * Props of the component if `component={Component}` is used.
 */
// prettier-ignore
export type OverrideProps<
  M extends OverridableTypeMap,
  C extends React.ElementType
> = (
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<C>, keyof BaseProps<M>>
);

/**
 * Props if `component={Component}` is NOT used.
 */
// prettier-ignore
export type DefaultComponentProps<
  M extends OverridableTypeMap
> = (
  & BaseProps<M>
  & Omit<React.ComponentPropsWithRef<M['defaultComponent']>, keyof BaseProps<M>>
)

/**
 * Props defined on the component.
 */
export type BaseProps<M extends OverridableTypeMap> = M["props"];

export interface OverridableTypeMap {
  props: {};
  defaultComponent: React.ElementType;
}
