import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";

function PropsSeksjonMarkdown(
  data: ExtractPortableMarkdownComponentProps<"props_seksjon">,
) {
  const { komponenter, title } = data.value;

  if (!komponenter || komponenter.length === 0 || !title) {
    return "";
  }

  const sections = komponenter
    .map((component) => {
      const propList =
        component.propref?.proplist?.filter(
          (prop) => !prop.description?.includes("@private"),
        ) ?? [];

      if (component.overridable) {
        propList.push({
          description: "OverridableComponent-api",
          required: false,
          name: "as",
          type: "React.ElementType",
          _type: "prop" as const,
          _key: "overridable",
        });
      }

      if (propList.length === 0) {
        return null;
      }

      const heading = `**${component.title ?? "Props"}**`;

      const meta: string[] = [];
      if (component.propref?.displayname) {
        meta.push(`Component: \`${component.propref.displayname}\``);
      }
      const refProp = component.propref?.proplist?.find((p) => p.ref);
      if (refProp?.type) {
        const element = extractElementType(refProp.type);
        if (element) {
          meta.push(`Extends: \`${element}\``);
        }
      }
      if (component.overridable) {
        meta.push("Supports `as` prop for polymorphism");
      }
      const metaLine = meta.length > 0 ? meta.join(" | ") : null;

      const header = "| Prop | Type | Default | Required | Description |";
      const separator = "| --- | --- | --- | --- | --- |";
      const rows = propList.map((prop) => {
        const name = prop.deprecated ? `~~${prop.name}~~` : prop.name;
        const type = escapeCell(prop.type ?? "");
        const defaultVal = escapeCell(prop.defaultValue ?? "-");
        const required = prop.required ? "Yes" : "No";
        const desc = prop.deprecated
          ? `**Deprecated:** ${prop.deprecated}`
          : escapeCell(prop.description ?? "");
        return `| \`${name}\` | \`${type}\` | ${defaultVal} | ${required} | ${desc} |`;
      });

      return buildMarkdown(
        heading,
        metaLine,
        [header, separator, ...rows].join("\n"),
      );
    })
    .filter(Boolean);

  return buildMarkdown(...sections);
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function extractElementType(refType: string): string | null {
  const match = refType.match(/Ref<(HTML\w+Element)>/);
  return match ? match[1] : null;
}

export { PropsSeksjonMarkdown };
