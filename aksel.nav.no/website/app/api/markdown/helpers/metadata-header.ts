type MetadataConfig = {
  title: string;
  url: string;
  status?: string;
  category?: string;
  packages?: string[];
};

const STATUS_LABELS: Record<string, string> = {
  beta: "Beta",
  new: "New",
  ready: "Stable",
  deprecated: "Deprecated",
};

function buildMetadataHeader(config: MetadataConfig): string {
  const lines: string[] = ["---"];

  lines.push(`title: ${config.title}`);
  lines.push(`url: ${config.url}`);

  if (config.status) {
    lines.push(`status: ${STATUS_LABELS[config.status] ?? config.status}`);
  }

  if (config.category) {
    lines.push(`category: ${config.category}`);
  }

  lines.push("---");

  return lines.join("\n");
}

export { buildMetadataHeader, type MetadataConfig };
