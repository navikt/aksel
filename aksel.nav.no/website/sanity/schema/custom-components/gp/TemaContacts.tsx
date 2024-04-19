import { groq } from "next-sanity";
import { useMemoObservable } from "react-rx";
import { useDocumentStore, useFormValue } from "sanity";
import { BodyLong, Heading, Link } from "@navikt/ds-react";

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
    <div className="rounded-md bg-surface-subtle p-4 dark:bg-gray-900">
      <Heading level="3" size="small" className="mb-1">
        Temakontakter
      </Heading>
      <BodyLong className="mb-4">
        Kontaktpersoner for temaene valgt på denne artikkelen. Hvis du trenger
        hjelp med innhold eller struktur, kan du ta kontakt med en av disse.
      </BodyLong>
      <div className="space-y-2">
        {results.toReversed().map((res) => {
          return (
            <dl key={res.tema.title}>
              <Heading as="dt" size="xsmall" className="mb-1">
                {res.tema.title}
              </Heading>
              {res.tema.contacts.map((contact) => (
                <dd key={contact.title}>
                  {`${contact.title} `}
                  {contact.email && (
                    <Link href={`mailto:${contact.email}`}>(Send e-post)</Link>
                  )}
                </dd>
              ))}
            </dl>
          );
        })}
      </div>
    </div>
  );
}
