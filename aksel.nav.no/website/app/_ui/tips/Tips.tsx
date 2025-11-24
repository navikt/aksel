import { PortableTextBlock } from "next-sanity";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { EditorPanel } from "@/app/_ui/editor-panel/EditorPanel";

function Tips(props: ExtractPortableComponentProps<"tips">) {
  const { body } = props.value;

  if (!body || body?.length === 0) {
    return null;
  }

  return (
    <EditorPanel variant="tips" headingTag="div">
      <CustomPortableText value={body as PortableTextBlock[]} />
    </EditorPanel>
  );
}

export { Tips };
