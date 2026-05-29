import { UploadIcon } from "@navikt/aksel-icons";
import { BodyShort, Button, FileUpload, Label, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-8" align="start">
      <VStack gap="space-2" align="start">
        <Label id="label-id" as="div">
          Last opp dokumentasjon
        </Label>
        <BodyShort id="desc-id" textColor="subtle">
          Du kan laste opp Word- og PDF-filer. Maks 3 filer. Maks størrelse 1
          MB.
        </BodyShort>
      </VStack>

      <FileUpload.Trigger multiple={false} onSelect={console.info}>
        <Button
          aria-describedby="label-id desc-id"
          variant="secondary"
          icon={<UploadIcon aria-hidden />}
        >
          Last opp filer
        </Button>
      </FileUpload.Trigger>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "Enkel knapp uten dropzone. Label og ev. beskrivelse kobles opp med `aria-describedby`.",
};
