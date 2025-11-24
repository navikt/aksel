import { ChipsRemovable, ChipsToggle } from "@navikt/ds-react/Chips";

export const MyComponent = () => {
  return (
    <div>
      <ChipsToggle data-color="accent">Text</ChipsToggle>
      <ChipsToggle data-color="neutral">Text</ChipsToggle>
      <ChipsRemovable data-color="accent">Text</ChipsRemovable>
      <ChipsRemovable data-color="neutral">Text</ChipsRemovable>
      <ChipsToggle data-color="brand-beige">Text</ChipsToggle>
      <ChipsToggle data-color="brand-beige">Text</ChipsToggle>
    </div>
  );
};
