import { UNSAFE_FileUpload, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => (
  <VStack gap="12">
    <UNSAFE_FileUpload.Dropzone
      label="Last opp filer"
      onSelect={console.info}
      disabled
    />

    <UNSAFE_FileUpload.Dropzone
      label="Last opp filer"
      onSelect={console.info}
      fileLimit={{ max: 1, current: 1 }}
    />
  </VStack>
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
};
