import { useMemoObservable } from "react-rx";
import { SanityDocument, useDocumentStore, useFormValue } from "sanity";
import { TagFillIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";

type MetadataT = {
  title: string;
  description: string;
  slug: string;
};

type UnderTemaT = SanityDocument &
  MetadataT & { tema: SanityDocument & MetadataT };

export function UndertemaHighlight(props) {
  const underTemas = useFormValue(["undertema"]) as { _ref: string }[];

  const documentStore = useDocumentStore();

  const results: UnderTemaT[] = useMemoObservable(() => {
    return documentStore.listenQuery(
      `*[_type == 'gp.tema.undertema' && _id in $refs && !(_id in path("drafts.**"))]{..., tema->}`,
      { refs: underTemas?.map((x) => x._ref) ?? [] },
      {},
    );
  }, [documentStore, underTemas]);

  if (!results) {
    return props.renderDefault(props);
  }

  return (
    <div>
      <div>{props.renderDefault(props)}</div>
      <div className="mt-4 space-y-4">
        {results.toReversed().map((res) => {
          return (
            <div
              key={res._id}
              className="rounded-md bg-surface-subtle p-4 dark:bg-gray-900"
            >
              <div className="inline-flex items-center gap-1 text-teal-700 dark:text-teal-300">
                <TagFillIcon aria-hidden fontSize="1rem" className="shrink-0" />
                <Heading level="3" size="small">
                  {`${res.title} (undertema)`}
                </Heading>
              </div>
              {res.description && (
                <BodyLong className="mt-2">{res.description}</BodyLong>
              )}
              <div className="ml-2 mt-3 border-l-4 border-border-default pl-4 dark:border-white">
                <Heading level="4" size="xsmall">
                  {res.tema.title} (tema)
                </Heading>
                {res.tema.description && (
                  <BodyLong className="mt-2">{res.tema.description}</BodyLong>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
