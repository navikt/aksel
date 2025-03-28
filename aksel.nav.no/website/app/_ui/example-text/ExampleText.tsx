import { useId } from "react";
import {
  BodyLong,
  CopyButton,
  HStack,
  Heading,
  VStack,
} from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import styles from "./ExampleText.module.css";

function ExampleText(
  props: ExtractPortableComponentProps<"exampletext_block">,
) {
  const { title, text } = props.value;
  const id = useId();

  if (!text || !title) {
    return null;
  }

  return (
    <section
      aria-labelledby={id}
      className={styles.exampleText}
      data-block-margin="space-28"
    >
      <HStack justify="space-between" gap="4" align="center" wrap={false}>
        <Heading size="small" as="p" textColor="subtle" id={id} aria-hidden>
          {title}
        </Heading>
        <CopyButton copyText={text} size="small" />
      </HStack>

      <hr aria-hidden className={styles.exampleTextDivider} />
      <VStack gap="space-24">{formatText(text)}</VStack>
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
