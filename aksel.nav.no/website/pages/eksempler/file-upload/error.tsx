import { UNSAFE_FileUpload, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => (
  <VStack gap="12">
    <UNSAFE_FileUpload.Dropzone
      label="Last opp filer"
      onSelect={console.info}
      error="Du må laste opp en fil"
    />

    <UNSAFE_FileUpload.Item
      file={{ name: "eksempel.png", size: 200000 }}
      error="Filformatet støttes ikke"
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
  index: 3,
  desc: "Feilmelding om for mange filer bør legges i en separat Alert og plasseres over listen med filer.",
};
