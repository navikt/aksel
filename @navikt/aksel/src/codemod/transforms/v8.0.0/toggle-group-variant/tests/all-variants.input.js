import { ToggleGroup } from "@navikt/ds-react";

const Component = () => {
  return <div>
    <ToggleGroup variant="action">Text</ToggleGroup>
    <ToggleGroup variant="neutral">Text</ToggleGroup>
    <ToggleGroup data-color="warning" variant="action">Text</ToggleGroup>
    <ToggleGroup data-color="warning" variant="neutral">Text</ToggleGroup>
  </div>;
}
