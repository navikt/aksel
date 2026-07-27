import { format } from "date-fns/format";
import { Suspense, useMemo } from "react";
import { useMemoObservable } from "react-rx";
import { useDocumentStore, useFormValue } from "sanity";
import { useIntentLink } from "sanity/router";
import { HStack, Heading, Link, Table } from "@navikt/ds-react";

type DocumentT = {
  heading: string;
  slug: {
    current: string;
  };
  _id: string;
  endringsdato: string;
};

function EndringsloggReferanser({ source }: { source: "gp" | "ds" }) {
  return (
    <Suspense>
      <EndringsloggReferanserList source={source} />
    </Suspense>
  );
}

function EndringsloggReferanserList({ source }: { source: "gp" | "ds" }) {
  const id = (useFormValue(["_id"]) as string) ?? "";

  const documentStore = useDocumentStore();
  const changelogs: DocumentT[] = useMemoObservable(() => {
    return documentStore.listenQuery(
      `*[_type == $source && $id in artikler[]._ref]{heading, slug, _id, endringsdato}`,
      {
        id: id.replace("drafts.", ""),
        source:
          source === "gp"
            ? "gp_endringslogg_artikkel"
            : "ds_endringslogg_artikkel",
      },
      {},
    );
  }, [documentStore, id]);

  const parsedChangelogs: DocumentT[] | undefined = useMemo(() => {
    return changelogs?.filter((log) => {
      if (log._id.includes("drafts.")) {
        return false;
      }

      return log._id && log.endringsdato && log.heading && log.slug?.current;
    });
  }, [changelogs]);

  const getEmptyState = () => {
    if (parsedChangelogs === undefined) {
      return (
        <HStack justify="center" padding="space-6">
          Laster endringslogg...
        </HStack>
      );
    }

    if (parsedChangelogs.length === 0) {
      return (
        <HStack justify="center" padding="space-6">
          Ingen endringslogg for denne artikkelen
        </HStack>
      );
    }

    return undefined;
  };

  return (
    <div>
      <Heading level="2" size="small" spacing>
        Endringslogg
      </Heading>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Dato</Table.HeaderCell>
            <Table.HeaderCell scope="col">Endringer</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {parsedChangelogs?.map((doc) => {
            return (
              <Table.Row key={doc._id}>
                <Table.HeaderCell scope="row">
                  {format(new Date(doc.endringsdato), "dd.MM.yyyy")}
                </Table.HeaderCell>
                <Table.DataCell>
                  <ChangelogLink doc={doc} />
                </Table.DataCell>
              </Table.Row>
            );
          })}
          {(!parsedChangelogs || parsedChangelogs.length === 0) && (
            <Table.Row>
              <Table.DataCell colSpan={2}>{getEmptyState()}</Table.DataCell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

function ChangelogLink({ doc }: { doc: DocumentT }) {
  const { href, onClick } = useIntentLink({
    intent: "edit",
    params: { id: doc._id },
  });

  return (
    <Link href={href} onClick={onClick}>
      {doc.heading}
    </Link>
  );
}

export { EndringsloggReferanser };
