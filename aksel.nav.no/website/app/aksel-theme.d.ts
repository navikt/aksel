import type {} from "@navikt/core/react/types/colors";

// This is a demonstration file showing how to extend the AkselColors type.
// Create a similar .d.ts file in your project (e.g., aksel-custom.d.ts)
// and ensure it's included in your tsconfig.json "include" array.

declare module "@navikt/ds-react/types/colors" {
  export interface CustomAkselColors {
    "my-brand-primary": never;
    "project-specific-accent": never;
    "another-custom-color": never;
  }
}

// Example of using the extended AkselColors type in a component:
/*
import React from 'react';

interface MyComponentProps {
  color: import('@navikt/core/react/src/types/colors').AkselColors;
}

const MyComponent: React.FC<MyComponentProps> = ({ color }) => {
  return <div data-color={color}>Hello World</div>;
};

// Valid usage:
const component1 = <MyComponent color="danger" />; // Predefined color
const component2 = <MyComponent color="my-brand-primary" />; // Custom color
const component3 = <MyComponent color="project-specific-accent" />; // Custom color

// Invalid usage (TypeScript will error if tsconfig is set up correctly):
// const component4 = <MyComponent color="non-existent-color" />;
*/
