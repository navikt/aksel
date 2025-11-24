import { Chips } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <Chips.Toggle variant="action">Text</Chips.Toggle>
      <Chips.Toggle variant="neutral">Text</Chips.Toggle>
      <Chips.Removable variant="action">Text</Chips.Removable>
      <Chips.Removable variant="neutral">Text</Chips.Removable>
      <Chips.Toggle data-color="brand-beige" variant="action">Text</Chips.Toggle>
      <Chips.Toggle data-color="brand-beige" variant="neutral">Text</Chips.Toggle>
    </div>
  );
};
