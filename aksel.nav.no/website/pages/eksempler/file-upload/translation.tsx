import { FileUpload, Heading, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => (
  <FileUpload
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
      <FileUpload.Dropzone label="Last opp bilder" onSelect={console.info} />
      <div>
        <Heading level="3" size="xsmall" spacing>
          Vedlegg
        </Heading>
        <VStack as="ul" gap="2">
          <FileUpload.Item
            as="li"
            file={{ name: "eksempel.png", size: 200000 }}
            status="uploading"
          />
          <FileUpload.Item
            as="li"
            file={{ name: "eksempel.png", size: 200000 }}
            status="uploading"
            translations={{ uploading: "Sender bilde..." }}
          />
        </VStack>
      </div>
    </VStack>
  </FileUpload>
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Med translations API-et kan du endre tekstene i komponentene.",
};
