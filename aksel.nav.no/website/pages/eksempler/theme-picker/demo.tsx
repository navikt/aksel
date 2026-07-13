import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Select,
  Textarea,
  Theme,
  VStack,
} from "@navikt/ds-react";
import type { AkselColor } from "@navikt/ds-react/types/theme";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [color, setColor] = useState<AkselColor>("accent");

  return (
    <Theme data-color={color}>
      <Box maxWidth="20rem">
        <VStack gap="space-8">
          <ColorPicker setColor={setColor} />
          <Textarea label="Tilbakemelding" />
          <Checkbox defaultChecked>Jeg samtykker til vilkårene</Checkbox>
        </VStack>
        <HStack gap="space-8" marginBlock="space-12 space-0">
          <Button variant="secondary">Avbryt</Button>
          <Button>Lagre</Button>
        </HStack>
      </Box>
    </Theme>
  );
};

function ColorPicker({ setColor }: { setColor: (color: AkselColor) => void }) {
  return (
    <Select
      label="Velg farge"
      onChange={(e) => setColor(e.target.value as AkselColor)}
    >
      <option value="accent">Accent</option>
      <option value="neutral">Neutral</option>
      <option value="brand-magenta">Brand-magenta</option>
      <option value="brand-blue">Brand-blue</option>
      <option value="brand-beige">Brand-beige</option>
      <option value="meta-purple">Meta-purple</option>
      <option value="meta-lime">Meta-lime</option>
      <option value="info">Info</option>
      <option value="success">Success</option>
      <option value="warning">Warning</option>
      <option value="danger">Danger</option>
    </Select>
  );
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 0,
};
