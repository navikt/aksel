import { BodyLong, CopyButton, VStack } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { EditorPanel } from "@/app/_ui/editor-panel/EditorPanel";

function ExampleText(
  props: ExtractPortableComponentProps<"exampletext_block">,
) {
  const { title, text } = props.value;

  if (!text || !title) {
    return null;
  }

  return (
    <section aria-label={title}>
      <EditorPanel
        variant="example-text"
        heading={title}
        headingTag="p"
        actionComponent={<CopyButton size="small" copyText={text} />}
      >
        <VStack gap="space-24">{formatText(text)}</VStack>
      </EditorPanel>
    </section>
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
