import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { portableMarkdown } from "@/app/api/markdown/helpers/portable-markdown";

const VARIANT_LABELS: Record<string, string> = {
  info: "Info",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

function AlertMarkdown(data: ExtractPortableMarkdownComponentProps<"alert">) {
  const { body, variant, heading } = data.value;

  if (!variant || !body || body.length === 0) {
    return "";
  }

  const content = portableMarkdown(body as any[]);

  if (!content) {
    return "";
  }

  const label = VARIANT_LABELS[variant] ?? "Note";
  const header = heading ? `> **${label}: ${heading}**` : `> **${label}:**`;

  const quoted = content
    .split("\n")
    .map((line) => `> ${line}`)
    .join("\n");

  return `${header}\n>\n${quoted}`;
}

export { AlertMarkdown };
