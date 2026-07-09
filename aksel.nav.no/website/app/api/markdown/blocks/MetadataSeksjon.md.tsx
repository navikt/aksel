import type { KOMPONENT_BY_SLUG_MARKDOWN_QUERY_RESULT } from "@/app/_sanity/query-types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";

type MetadataSeksjon =
  NonNullable<KOMPONENT_BY_SLUG_MARKDOWN_QUERY_RESULT>["component_metadata"];
type MetadataSeksjonEntries =
  | NonNullable<MetadataSeksjon>["components"]
  | NonNullable<MetadataSeksjon>["utils"];

function MetadataSeksjonMarkdown(data?: MetadataSeksjon) {
  if (!data?.components || data.components.length === 0) {
    return "";
  }

  return buildMarkdown(
    { heading: "Props", level: 2 },
    propsSeksjonMarkdown(data.components, "Component"),
    propsSeksjonMarkdown(data.utils, "Util"),
  );
}

function propsSeksjonMarkdown(
  data: MetadataSeksjonEntries,
  type: "Component" | "Util",
) {
  if (!data || data.length === 0) {
    return "";
  }

  const sections: string[] = [];

  for (const entry of data) {
    const propList =
      entry.props?.filter((prop) => !prop.description?.includes("@private")) ??
      [];

    if (entry.overridable) {
      propList.push({
        description: "OverridableComponent-api",
        required: false,
        name: "as",
        type: "React.ElementType",
        _type: "prop" as const,
        _key: "overridable",
        unpackedType: null,
      });
    }

    if (propList.length === 0) {
      continue;
    }

    const heading = `**${entry.displayname ?? "Props"}**`;

    const meta: string[] = [];
    if (entry.displayname) {
      meta.push(`${type}: \`${entry.displayname}\``);
    }
    const refProp = entry.props?.find((p) => p.ref);
    if (refProp?.type) {
      const element = extractElementType(refProp.type);
      if (element) {
        meta.push(`Extends: \`${element}\``);
      }
    }
    if (entry.overridable) {
      meta.push("Supports `as` prop for polymorphism");
    }
    const metaLine = meta.length > 0 ? meta.join(" | ") : null;

    const header = "| Prop | Type | Default | Required | Description |";
    const separator = "| --- | --- | --- | --- | --- |";
    const rows = propList.map((prop) => {
      const name = prop.deprecated ? `Deprecated: ${prop.name}` : prop.name;

      const defaultVal = escapeCell(prop.defaultValue ?? "-");
      const required = prop.required ? "Yes" : "No";
      let desc = prop.deprecated
        ? `**Deprecated:** ${prop.deprecated}`
        : escapeCell(prop.description ?? "");

      if (name === "ref") {
        desc = "";
      }
      return `| \`${name}\` | \`${escapeCell(prop.type ?? "")}\` | ${defaultVal} | ${required} | ${desc} |`;
    });

    sections.push(
      buildMarkdown(heading, metaLine, [header, separator, ...rows].join("\n")),
    );
  }

  return buildMarkdown(...sections.filter(Boolean));
}

function escapeCell(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function extractElementType(refType: string): string | null {
  const match = refType.match(/Ref<(HTML\w+Element)>/);
  return match ? match[1] : null;
}

export { MetadataSeksjonMarkdown };
