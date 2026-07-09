import { defineQuery } from "next-sanity";
import { type NextRequest, NextResponse } from "next/server";
import { sanityMarkdownFetch } from "@/app/_sanity/live";

export const revalidate = 7200;

const COMPONENT_PROPS_QUERY = defineQuery(
  `*[_type == "komponent_artikkel" && slug.current == $slug][0] {
    "title": heading,
    "component_metadata": component_metadata->{
      ...
    }
  }`,
);

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
    const { data } = await sanityMarkdownFetch({
      query: COMPONENT_PROPS_QUERY,
      params: { slug },
    });

    if (
      !data?.component_metadata ||
      data.component_metadata.components?.length === 0
    ) {
      return NextResponse.json(
        { error: "Component not found or has no props documentation", slug },
        { status: 404 },
      );
    }

    const parts: {
      title: string | null;
      props: {
        type: string | null;
        name: string | null;
        required: boolean | null;
        description: string | null;
        defaultValue: string | null;
        deprecated: string | null;
        example: string | null;
        params: string[] | null;
        return: string | null;
      }[];
    }[] = [];

    const sections: typeof data.component_metadata.components = [];

    if (data.component_metadata.components) {
      sections.push(...data.component_metadata.components);
    }

    /* if(data.component_metadata.utils){
      sections.push(...data.component_metadata.utils)
    } */

    for (const section of sections) {
      if (!section.displayname) {
        continue;
      }

      const props = (section?.props ?? [])
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

      let overridable: (typeof parts)[0]["props"][0] | null = null;

      if (section.overridable) {
        overridable = {
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
      }

      parts.push({
        title: section.displayname,
        props: [...props, ...(overridable ? [overridable] : [])],
      });
    }

    return NextResponse.json(
      { title: data.title, slug, parts },
      {
        headers: {
          "Cache-Control": `public, max-age=${revalidate}`,
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

const COMPONENT_SLUG_PATTERN = /^komponenter(?:\/[a-z0-9-]+){2}$/;

function normalizeComponentSlug(rawSlug: string) {
  const normalizedSlug = rawSlug.trim().replace(/^\/+|\/+$/g, "");

  if (!COMPONENT_SLUG_PATTERN.test(normalizedSlug)) {
    return null;
  }
  return normalizedSlug;
}
