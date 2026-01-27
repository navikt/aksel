import { groq } from "next-sanity";
import { useMemoObservable } from "react-rx";
import { useDocumentStore, useFormValue } from "sanity";
import { BodyLong, Box, Heading, Link, VStack } from "@navikt/ds-react";

type ResultT = {
  tema: { title: string; contacts: { title: string; email: string }[] };
};

const query = groq`*[_type == 'gp.tema.undertema' && _id in $refs && !(_id in path("drafts.**")) && count(tema->contacts) > 0]{
    "tema": tema->{title, "contacts": contacts[]->{...}},
  }`;

export function TemaContacts() {
  const underTemas = useFormValue(["undertema"]) as { _ref: string }[];

  const documentStore = useDocumentStore();

  const results: ResultT[] = useMemoObservable(() => {
    return documentStore.listenQuery(
      query,
      { refs: underTemas?.map((x) => x._ref) ?? [] },
      {},
    );
  }, [documentStore, underTemas]);

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <Box
      background="neutral-soft"
      borderWidth="1"
      borderColor="neutral-subtleA"
      borderRadius="4"
      padding="space-16"
      marginBlock="space-4 space-0"
    >
      <Heading level="3" size="small">
        Temakontakter
      </Heading>
      <BodyLong spacing>
        Kontaktpersoner for temaene valgt på denne artikkelen. Hvis du trenger
        hjelp med innhold eller struktur, kan du ta kontakt med en av disse.
      </BodyLong>
      <VStack gap="space-16">
        {results.toReversed().map((res) => {
          return (
            <dl key={res.tema.title}>
              <Heading as="dt" size="xsmall">
                {res.tema.title}
              </Heading>
              {res.tema.contacts.map((contact) => (
                <dd key={contact.title}>
                  {contact.title}{" "}
                  {contact.email && (
                    <Link href={`mailto:${contact.email}`}>(Send e-post)</Link>
                  )}
                </dd>
              ))}
            </dl>
          );
        })}
      </VStack>
    </Box>
  );
}
