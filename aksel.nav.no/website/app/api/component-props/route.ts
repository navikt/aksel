import { defineQuery } from "next-sanity";
import { type NextRequest, NextResponse } from "next/server";
import { sanityMarkdownFetch } from "@/app/_sanity/live";

const COMPONENT_SLUG_PATTERN = /^komponenter(?:\/[a-z0-9-]+){2}$/;

const COMPONENT_PROPS_QUERY = defineQuery(
  `*[_type == "komponent_artikkel" && slug.current == $slug][0] {
    "title": heading,
    "component_metadata": component_metadata->{
      ...
    }
  }`,
);

async function fetchComponentProps(slug: string) {
  "use cache";
  const { data } = await sanityMarkdownFetch({
    query: COMPONENT_PROPS_QUERY,
    params: { slug },
  });
  return data;
}

type ComponentProp = {
  type: string | null;
  name: string | null;
  required: boolean | null;
  description: string | null;
  defaultValue: string | null;
  deprecated: string | null;
  example: string | null;
  params: string[] | null;
  return: string | null;
};

type ComponentPart = {
  title: string | null;
  props: ComponentProp[];
};

const OVERRIDABLE_PROP: ComponentProp = {
  name: "as",
  type: "React.ElementType",
  required: false,
  description: "Override the root element (OverridableComponent API).",
  defaultValue: null,
  deprecated: null,
  example: null,
  params: null,
  return: null,
};

function normalizeComponentSlug(rawSlug: string) {
  const normalizedSlug = rawSlug.trim().replace(/^\/+|\/+$/g, "");

  return COMPONENT_SLUG_PATTERN.test(normalizedSlug) ? normalizedSlug : null;
}

/**
 * Route allows external tools (Aksel-mcp) to fetch props related to a specific component:
 * Example: https://aksel.nav.no/api/component-props?slug=komponenter/core/button
 */
export async function GET(request: NextRequest) {
  const rawSlug = request.nextUrl.searchParams.get("slug");

  if (!rawSlug) {
    return NextResponse.json(
      { error: "Missing required query parameter: slug" },
      { status: 400 },
    );
  }

  const slug = normalizeComponentSlug(rawSlug);

  if (!slug) {
    return NextResponse.json(
      {
        error:
          "Invalid slug. Expected a component slug starting with 'komponenter/'.",
      },
      { status: 400 },
    );
  }

  try {
    const data = await fetchComponentProps(slug);

    if (
      !data?.component_metadata ||
      ((data.component_metadata.components?.length ?? 0) === 0 &&
        (data.component_metadata.utils?.length ?? 0) === 0)
    ) {
      return NextResponse.json(
        { error: "Component not found or has no props documentation", slug },
        { status: 404 },
      );
    }

    const sections = [
      ...(data.component_metadata.components ?? []),
      ...(data.component_metadata.utils ?? []),
    ];

    const parts: ComponentPart[] = [];

    for (const section of sections) {
      if (!section.displayname) {
        continue;
      }

      const props: ComponentProp[] = (section.props ?? [])
        .filter((prop) => !prop.description?.includes("@private"))
        .sort((a, b) => {
          if (a.deprecated && !b.deprecated) return 1;
          if (!a.deprecated && b.deprecated) return -1;
          return 0;
        })
        .map(({ unpackedType, type, ...rest }) => ({
          name: rest.name ?? null,
          type: unpackedType ?? type ?? null,
          required: rest.required ?? null,
          description: rest.description ?? null,
          defaultValue: rest.defaultValue ?? null,
          deprecated: rest.deprecated ?? null,
          example: rest.example ?? null,
          params: rest.params ?? null,
          return: rest.return ?? null,
        }));

      if (section.overridable) {
        props.push(OVERRIDABLE_PROP);
      }

      parts.push({ title: section.displayname, props });
    }

    return NextResponse.json(
      { title: data.title, slug, parts },
      {
        headers: {
          "Cache-Control": `public, max-age=7200`,
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch component props", { slug, error });

    return NextResponse.json(
      { error: "Failed to fetch component props", slug },
      { status: 500 },
    );
  }
}
