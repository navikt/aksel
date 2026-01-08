import { FileUpload, Heading, InlineMessage, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => (
  <VStack gap="space-48">
    <FileUpload.Dropzone
      label="Last opp filer"
      description="Du kan laste opp opptil 3 filer."
      fileLimit={{ max: 3, current: 4 }}
      onSelect={console.info}
    />

    <VStack gap="space-8">
      <Heading level="3" size="xsmall">
        Vedlegg (4 av maks 3)
      </Heading>
      <InlineMessage status="error" role="alert">
        Du har lagt ved for mange filer. Maks antall er 3.
      </InlineMessage>
      <VStack as="ul" gap="space-12">
        <FileUpload.Item
          as="li"
          file={{ name: "eksempel.png", size: 200000 }}
          button={{
            action: "delete",
            onClick: () => {},
          }}
        />
        <FileUpload.Item
          as="li"
          file={{ name: "eksempel2.png", size: 200000 }}
          button={{
            action: "delete",
            onClick: () => {},
          }}
        />
        <FileUpload.Item
          as="li"
          file={{ name: "eksempel3.png", size: 200000 }}
          button={{
            action: "delete",
            onClick: () => {},
          }}
        />
        <FileUpload.Item
          as="li"
          file={{ name: "eksempel4.png", size: 200000 }}
          button={{
            action: "delete",
            onClick: () => {},
          }}
        />
      </VStack>
    </VStack>
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
};
