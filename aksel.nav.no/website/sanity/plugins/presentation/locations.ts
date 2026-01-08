import { Observable, map } from "rxjs";
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from "sanity/presentation";
import { allArticleDocuments } from "@/sanity/config";

const validTypes: string[] = [...allArticleDocuments];

export const locations: DocumentLocationResolver = (params, context) => {
  const doc$ = context.documentStore.listenQuery(
    `*[(_type != $type && references($id)) || _id == $id && _type in $articleTypes ]{_type, slug, title, heading, "tema": undertema[]->tema->title}`,
    { id: params.id, type: params.type, articleTypes: validTypes },
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

      /**
       * By returning "null", the "Not used on any pages" will not be shown.
       */
      if (validTypes.includes(params.type) && foundLocations.length === 0) {
        return null;
      }

      return {
        locations: foundLocations,
      } satisfies DocumentLocationsState;
    }),
  );
};
