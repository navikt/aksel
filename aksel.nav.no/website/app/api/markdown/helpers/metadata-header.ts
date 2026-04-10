type MetadataConfig = {
  title: string;
  url: string;
  status?: string;
  category?: string;
  packages?: string[];
};

function buildXMLTag(tag: string, attributes: Record<string, string> = {}) {
  if (attributes) {
    const attrString = Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");
    return {
      open: `<${tag} ${attrString}>`,
      close: `</${tag}>`,
    };
  }

  return {
    open: `<${tag}>`,
    close: `</${tag}>`,
  };
}

export { type MetadataConfig, buildXMLTag };
