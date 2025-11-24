import { ChipsRemovable, ChipsToggle } from "@navikt/ds-react/Chips";

export const MyComponent = () => {
  return (
    <div>
      <ChipsToggle variant="action">Text</ChipsToggle>
      <ChipsToggle variant="neutral">Text</ChipsToggle>
      <ChipsRemovable variant="action">Text</ChipsRemovable>
      <ChipsRemovable variant="neutral">Text</ChipsRemovable>
      <ChipsToggle data-color="brand-beige" variant="action">Text</ChipsToggle>
      <ChipsToggle data-color="brand-beige" variant="neutral">Text</ChipsToggle>
    </div>
  );
};
