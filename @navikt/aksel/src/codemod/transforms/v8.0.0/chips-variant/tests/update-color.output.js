import { Chips } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <Chips.Toggle data-color="accent">Text</Chips.Toggle>
      <Chips.Toggle data-color="neutral">Text</Chips.Toggle>
      <Chips.Removable data-color="accent">Text</Chips.Removable>
      <Chips.Removable data-color="neutral">Text</Chips.Removable>
      <Chips.Toggle data-color="brand-beige">Text</Chips.Toggle>
      <Chips.Toggle data-color="brand-beige">Text</Chips.Toggle>
    </div>
  );
};
