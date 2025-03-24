import { PortableTextBlock } from "next-sanity";
import { LightBulbIcon } from "@navikt/aksel-icons";
import { HStack, Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import styles from "./Tips.module.css";

function Tips(props: ExtractPortableComponentProps<"tips">) {
  const { body } = props.value;

  if (!body || body?.length === 0) {
    return null;
  }

  return (
    <div data-block-margin="space-28" className={styles.tips}>
      <HStack gap="space-4" align="center" className={styles.tipsHeader}>
        <LightBulbIcon fontSize="1.5rem" title="tips" aria-hidden />
        <Heading size="small" as="p">
          Tips
        </Heading>
      </HStack>
      <CustomPortableText value={body as PortableTextBlock[]} />
    </div>
  );
}

export { Tips };
