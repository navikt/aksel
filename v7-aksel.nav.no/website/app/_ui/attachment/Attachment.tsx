import { PortableTextBlock } from "next-sanity";
import { DownloadIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { EditorPanel } from "@/app/_ui/editor-panel/EditorPanel";

function Attachment(props: ExtractPortableComponentProps<"attachment">) {
  const { title, downloadLink, fileName, size, body } = props.value;

  if (!title || !downloadLink || !fileName || !size || !body) {
    return null;
  }

  const filetype = downloadLink.split(".").at(-1);

  return (
    <EditorPanel
      variant="attachment"
      heading={title}
      actionComponent={
        <Button
          variant="tertiary-neutral"
          as="a"
          href={`${downloadLink}?dl=${fileName}.${filetype}`}
          rel="noreferrer noopener"
          download={fileName}
          icon={<DownloadIcon title="Laste ned logopakke" />}
          size="small"
        />
      }
    >
      <CustomPortableText value={body as PortableTextBlock[]} />
    </EditorPanel>
  );
}

export { Attachment };
