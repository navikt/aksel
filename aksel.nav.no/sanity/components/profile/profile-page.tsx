import { Caseworker, Sandglass, Upload, Wrench } from "@navikt/ds-icons";
import {
  BodyShort,
  Detail,
  Heading,
  HelpText,
  Label,
  Link,
  ReadMore,
} from "@navikt/ds-react";
import { SanityDocument } from "@sanity/client";
import { Stack } from "@sanity/ui";
import userStore from "part:@sanity/base/user";
import { WithReferringDocuments } from "part:@sanity/base/with-referring-documents";
import Spinner from "part:@sanity/components/loading/spinner";
import { withDocument } from "part:@sanity/form-builder";
import React, { useEffect, useState } from "react";
import ReferringDocumentsList from "./document-list";
import styles from "../styles.css";
import { getDrafts, getPublished, getUnpublished } from "./filter-docs";

type Props = {
  referringDocuments: Record<string, any>[];
  isLoading: boolean;
  published?: SanityDocument | null;
  type: any;
  document: any;
};

const IntroPage = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { document } = props;
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    userStore.getCurrentUser().then((user) => setUser(user));
  }, []);

  const EmptyState = () => (
    <Detail className={styles.detailsContent} size="small">
      Ingen sider her...
    </Detail>
  );
  if (
    !document._id ||
    (document?.user_id?.current !== user.id &&
      !user?.roles?.find((x) => x.name === "administrator"))
  )
    return null;

  return (
    <Stack ref={ref} space={[3, 1, 2, 4]}>
      <Heading level="2" size="medium" spacing style={{ display: "flex" }}>
        Profil <Caseworker style={{ marginLeft: "0.5rem", fontSize: "2rem" }} />
      </Heading>
      {user?.roles && (
        <div>
          <Heading level="3" size="small" spacing>
            Roller/tilganger:
          </Heading>
          {user?.roles.map((x, i) => (
            <div key={i}>
              <Label size="small" spacing as="p">
                {x?.title}
              </Label>
              <BodyShort size="small">{x?.description}</BodyShort>
            </div>
          ))}
        </div>
      )}
      <BodyShort
        size="small"
        spacing
        as="span"
        style={{ display: "flex", gap: "0.5rem" }}
      >
        <ReadMore header="Har du ikke de rollene du trenger?">
          Send en melding til oss på{" "}
          <Link href="https://nav-it.slack.com/archives/C7NE7A8UF">
            #aksel-designsystemet
          </Link>{" "}
          slack så fikser vi det.
        </ReadMore>
      </BodyShort>
      <div style={{ borderTop: "1px solid #bbb" }} />

      <WithReferringDocuments id={document._id?.replace("drafts.", "")}>
        {({ referringDocuments, isLoading }) => {
          if (isLoading) {
            return <Spinner message="Looking for referring documents…" />;
          }
          if (!referringDocuments.length) return null;

          const drafts = getDrafts(referringDocuments);
          const published = getPublished(referringDocuments);
          const unpublished = getUnpublished(referringDocuments);

          return (
            <Stack space={2}>
              <Heading level="3" size="xsmall" style={{ display: "flex" }}>
                <Upload />
                Publiserte sider
              </Heading>

              <ReadMore header={`Oppdaterte: ${published.length}`}>
                {published ? (
                  <ReferringDocumentsList documents={published} />
                ) : (
                  <EmptyState />
                )}
              </ReadMore>
              <ReadMore header={`Med upubliserte endringer: ${drafts.length}`}>
                {drafts ? (
                  <ReferringDocumentsList documents={drafts} />
                ) : (
                  <EmptyState />
                )}
              </ReadMore>
              <Heading level="3" size="xsmall" className={styles.headings}>
                <Wrench />
                Under arbeid
              </Heading>
              <ReadMore header={`Sider: ${unpublished.length}`}>
                {unpublished ? (
                  <ReferringDocumentsList documents={unpublished} />
                ) : (
                  <EmptyState />
                )}
              </ReadMore>
              <Heading level="3" size="xsmall" className={styles.headings}>
                <Sandglass />
                Utdaterte sider
              </Heading>
              <ReadMore header={`Ikke oppdatert på over 90 dager: 0`}>
                <EmptyState />
              </ReadMore>
              <ReadMore header={`Ikke oppdatert på over 180 dager: 0`}>
                <EmptyState />
              </ReadMore>
            </Stack>
          );
        }}
      </WithReferringDocuments>
    </Stack>
  );
});

export default withDocument(IntroPage);
