import { PortableTextBlock } from "next-sanity";
import { useId } from "react";
import { DownloadIcon } from "@navikt/aksel-icons";
import { Heading, Link, VStack } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import styles from "./Attachment.module.css";

function Attachment(props: ExtractPortableComponentProps<"attachment">) {
  const { title, downloadLink, fileName, size, body } = props.value;

  const id = useId();

  if (!title || !downloadLink || !fileName || !size) {
    return null;
  }

  const filetype = downloadLink.split(".").at(-1);

  return (
    <section
      data-block-margin="space-28"
      aria-labelledby={id}
      className={styles.attachment}
      data-color-role="aksel-brand-pink"
    >
      <span className={styles.attachmentIcon}>
        <DownloadIcon aria-hidden fontSize="1.5rem" />
      </span>
      <div>
        <Heading size="small" level="2" id={id} aria-hidden>
          {title}
        </Heading>
        <VStack gap="space-8">
          {body && <CustomPortableText value={body as PortableTextBlock[]} />}

          <Link
            href={`${downloadLink}?dl=${fileName}.${filetype}`}
            rel="noreferrer noopener"
            download={fileName}
          >
            {`${fileName}.${filetype} `}
          </Link>
        </VStack>
      </div>
    </section>
  );
}

export { Attachment };
