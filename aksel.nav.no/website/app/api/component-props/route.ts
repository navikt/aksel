import { defineQuery } from "next-sanity";
import { type NextRequest, NextResponse } from "next/server";
import { sanityMarkdownFetch } from "@/app/_sanity/live";

export const revalidate = false;

const COMPONENT_PROPS_QUERY = defineQuery(
  `*[_type == "komponent_artikkel" && slug.current == $slug][0] {
    "title": heading,
    "propSections": content[_type == "props_seksjon"][].komponenter[] {
      title,
      overridable,
      "props": propref->proplist[] {
        name,
        type,
        unpackedType,
        required,
        description,
        defaultValue,
        deprecated
      }
    }
  }`,
);

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing required query parameter: slug" },
      { status: 400 },
    );
  }

  const { data } = await sanityMarkdownFetch({
    query: COMPONENT_PROPS_QUERY,
    params: { slug },
  });

  if (!data?.propSections || data.propSections.length === 0) {
    return NextResponse.json(
      { error: "Component not found or has no props documentation", slug },
      { status: 404 },
    );
  }

  const parts = data.propSections.map((section) => {
    const props = (section.props ?? [])
      .filter((prop) => !prop.description?.includes("@private"))
      .sort((a, b) => {
        if (a.deprecated && !b.deprecated) return 1;
        if (!a.deprecated && b.deprecated) return -1;
        return 0;
      })
      .map(({ unpackedType, type, ...rest }) => ({
        ...rest,
        type: unpackedType ?? type,
      }));

    if (section.overridable) {
      props.push({
        name: "as",
        type: "React.ElementType",
        required: false,
        description: "Override the root element (OverridableComponent API).",
        defaultValue: null,
        deprecated: null,
      });
    }

    return { title: section.title, props };
  });

  return NextResponse.json(
    { title: data.title, slug, parts },
    {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    },
  );
}
