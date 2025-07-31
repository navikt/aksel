import { useMemoObservable } from "react-rx";
import { type SanityDocument, useDocumentStore, useFormValue } from "sanity";
import { TagFillIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BoxNew,
  HStack,
  Heading,
  ReadMore,
  VStack,
} from "@navikt/ds-react";
import { TemaContacts } from "./TemaContacts";

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
      <VStack gap="space-16" marginBlock="space-4 space-0">
        {results.toReversed().map((res) => {
          return (
            <BoxNew
              key={res._id}
              background="neutral-soft"
              borderWidth="1"
              borderColor="neutral-subtleA"
              borderRadius="medium"
              padding="space-16"
              marginBlock="space-4 space-0"
            >
              <HStack
                gap="space-4"
                marginBlock="space-0 space-4"
                align="center"
              >
                <TagFillIcon aria-hidden fontSize="1.25rem" />
                <Heading level="3" size="small">
                  {`${res.title} (undertema)`}
                </Heading>
              </HStack>
              <VStack gap="space-8">
                {res.description && <BodyLong>{res.description}</BodyLong>}
                <ReadMore header={`${res.tema.title} (tema)`}>
                  {res.tema.description && (
                    <BodyLong>{res.tema.description}</BodyLong>
                  )}
                </ReadMore>
              </VStack>
            </BoxNew>
          );
        })}
        <TemaContacts />
      </VStack>
    </div>
  );
}
