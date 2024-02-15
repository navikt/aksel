import { Heading, UNSAFE_FileUpload, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => (
  <UNSAFE_FileUpload
    translations={{
      dropzone: {
        dragAndDropMultiple: "Dra og slipp bilder i format .png",
        buttonMultiple: "Velg bilder",
      },
      item: {
        uploading: "Laster opp bilde...",
      },
    }}
  >
    <VStack gap="6">
      <UNSAFE_FileUpload.Dropzone
        label="Last opp bilder"
        onSelect={console.log}
      />
      <VStack gap="2">
        <Heading level="3" size="xsmall">
          Vedlagte filer
        </Heading>
        <UNSAFE_FileUpload.Item
          file={{ name: "eksempel.png", size: 200000 }}
          status="uploading"
        />
        <UNSAFE_FileUpload.Item
          file={{ name: "eksempel.png", size: 200000 }}
          status="uploading"
          translations={{ item: { uploading: "Sender bilde..." } }}
        />
      </VStack>
    </VStack>
  </UNSAFE_FileUpload>
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
};
