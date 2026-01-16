import React from "react";

/**
 * This interface represents a component that can be overridden with different props and elements.
 * @template Component The type of the props for the component.
 * @template Element The type of the HTML element that the component renders.
 */
interface OverridableComponent<Component, Element extends HTMLElement> {
  /**
   * This is a function type that takes props and returns a React functional component.
   * @param props The props for the component, which are a combination of the Component type and React.RefAttributes for the Element type.
   * @returns A React functional component.
   */
  (props: Component & React.RefAttributes<Element>): ReturnType<React.FC>;

  /**
   * This is a function type that takes props and returns a React functional component.
   * It allows for the 'as' prop to override the type of element that the component renders.
   * @template As The type of the element that the component should render as.
   * @param props The props for the component, which are a combination of the Component type, the 'as' prop, and any other props that are not part of the Component type or the 'as' prop.
   * @returns A React functional component.
   */
  <As extends React.ElementType>(
    props: {
      as: As;
    } & Component &
      Omit<React.ComponentPropsWithRef<As>, keyof Component | "as">,
  ): ReturnType<React.FC>;
}

export type { OverridableComponent };
