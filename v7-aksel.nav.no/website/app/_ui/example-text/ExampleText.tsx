import { FileTextIcon } from "@navikt/aksel-icons";
import { BodyLong, CopyButton, Spacer, VStack } from "@navikt/ds-react";
import {
  InfoCard,
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";

function ExampleText(
  props: ExtractPortableComponentProps<"exampletext_block">,
) {
  const { title, text } = props.value;

  if (!text || !title) {
    return null;
  }

  return (
    <InfoCard data-color="neutral" aria-label={title} as="section">
      <InfoCardHeader icon={<FileTextIcon aria-hidden fontSize="1.5rem" />}>
        <InfoCardTitle as="div">{title}</InfoCardTitle>
        <Spacer />
        <CopyButton size="small" copyText={text} />
      </InfoCardHeader>
      <InfoCardContent>
        <VStack gap="space-24">{formatText(text)}</VStack>
      </InfoCardContent>
    </InfoCard>
  );
}

function formatText(text: string) {
  if (!text) return null;

  return text
    .split("\n")
    .filter(Boolean)
    .map((line) => <BodyLong key={line}>{line}</BodyLong>);
}

export { ExampleText };
