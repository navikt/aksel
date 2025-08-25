// locations.ts
import { Observable, map } from "rxjs";
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from "sanity/presentation";

export const locations: DocumentLocationResolver = (params, context) => {
  // Handle both editor and editorial_staff types
  if (params.type === "editor" || params.type === "editorial_staff") {
    // Listen to all documents that reference this document
    const doc$ = context.documentStore.listenQuery(
      `*[_type != $type && references($id)]{_type, slug, title, heading, "tema": undertema[]->tema->title}`,
      { id: params.id, type: params.type },
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
            const displayTitle = doc.heading || doc.title || "Untitled";
            const temaInfo = doc.tema ? ` (tema: ${doc.tema.join(", ")})` : "";

            return {
              title: `${displayTitle}${temaInfo}`,
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
