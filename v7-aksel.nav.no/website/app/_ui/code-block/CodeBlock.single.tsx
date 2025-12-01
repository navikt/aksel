import { useId } from "react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { CodeBlock } from "./CodeBlock";
import { CodeBlockTabsT } from "./CodeBlock.provider";

function SingleCodeBlock(props: ExtractPortableComponentProps<"kode">) {
  const { code, title } = props.value;
  const id = useId();

  if (!code || !code.code) {
    return null;
  }

  const tab: CodeBlockTabsT[number] = {
    code: code.code,
    lang: (code.language as any) ?? "tsx",
    text: code.language?.toUpperCase() ?? title ?? "Kode",
    value: id,
  };

  return <CodeBlock showLineNumbers tabs={[tab]} />;
}

export { SingleCodeBlock };
