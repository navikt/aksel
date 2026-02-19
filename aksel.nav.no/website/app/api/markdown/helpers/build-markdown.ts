type MarkdownPart =
  | string
  | { heading: string; level?: 1 | 2 | 3 | 4 | 5 | 6 }
  | null;

function renderPart(part: MarkdownPart): string | null {
  if (!part) {
    return null;
  }

  if (typeof part === "string") {
    return part;
  }

  const prefix = "#".repeat(part.level ?? 1);
  return `${prefix} ${part.heading}`;
}

function buildMarkdown(...parts: MarkdownPart[]): string {
  return parts.map(renderPart).filter(Boolean).join("\n\n");
}

export { buildMarkdown };
