// locations.ts
import { Observable, map } from "rxjs";
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from "sanity/presentation";

export const locations: DocumentLocationResolver = (params, context) => {
  if (params.type === "editor") {
    // Listen to all documents that reference this editor
    const doc$ = context.documentStore.listenQuery(
      `*[_type != 'editor' && references($id)]{_type, slug, title, heading, "tema": undertema[]->tema->title}`,
      { id: params.id },
      { perspective: "previewDrafts" },
    ) as Observable<
      | {
          _type: string;
          slug?: { current: string };
          title?: string | null;
          heading?: string | null;
          name?: string | null;
          tema?: string[] | null;
        }[]
      | null
    >;

    return doc$.pipe(
      map((docs) => {
        if (!docs) {
          return {
            message: "Unable to map document type to locations",
            tone: "critical",
          } satisfies DocumentLocationsState;
        }

        // Map each referencing document to a location
        const foundLocations = docs
          .filter((doc) => doc.slug?.current)
          .map((doc) => {
            return {
              title: doc.heading
                ? `${doc.heading} ${
                    doc.tema ? `(tema:${doc.tema.join("tema:, ")})` : ""
                  }`
                : "Untitled",
              href: `/${doc.slug?.current}`,
            };
          });

        return {
          locations: foundLocations,
        } satisfies DocumentLocationsState;
      }),
    );
  }

  return null;
};
