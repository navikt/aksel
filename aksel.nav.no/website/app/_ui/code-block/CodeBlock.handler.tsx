import { useId } from "react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { CodeBlock } from "./CodeBlock";
import type { CodeBlockTabsT } from "./CodeBlock.provider";

function CodeBlockHandler(props: ExtractPortableComponentProps<"kode">) {
  const { blokker, code, title } = props.value;
  const id = useId();

  const firstTab: CodeBlockTabsT[number] = {
    code: code?.code ?? "",
    lang: (code?.language as any) ?? "tsx",
    text: title ?? code?.language ?? "Kode",
    value: id,
  };

  const restTabs: CodeBlockTabsT = blokker
    ? blokker.map((blokk) => ({
        code: blokk.code?.code ?? "",
        lang: (blokk.code?.language as any) ?? "tsx",
        text: blokk.title ?? blokk.code?.language ?? "Kode",
        value: `${id}-${blokk._key}`,
      }))
    : [];

  const tabs = [firstTab, ...restTabs].filter((tab) => tab.code.trim() !== "");

  if (tabs.length === 0) {
    return null;
  }

  return <CodeBlock showLineNumbers={false} tabs={tabs} />;
}

export { CodeBlockHandler as SingleCodeBlock };
