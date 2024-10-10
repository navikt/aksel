import { differenceInMonths, format } from "date-fns";
import { useState } from "react";
import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  SanityDocument,
  useClient,
  useDocumentOperation,
} from "sanity";
import useSWR from "swr";
import { Button } from "@navikt/ds-react";
import { SanityBlockContent } from "@/sanity-block";
import { SANITY_API_VERSION } from "@/sanity/config";
import { Oppdateringsvarsel } from "../../../schema/documents/presets/oppdateringsvarsel";

export const createWrappedFocusAction = (action: DocumentActionComponent) => {
  const WrappedFocus = (
    props: DocumentActionProps,
  ): DocumentActionDescription | null => {
    const { patch, publish } = useDocumentOperation(props.id, props.type);
    const originalPublishDescription = action(props);
    const [verifyOpen, setVerifyOpen] = useState(false);
    const [publishOpen, setPublishOpen] = useState(false);

    const verifiedDocument = props.published as
      | (SanityDocument & Oppdateringsvarsel)
      | null;

    const verifiedDraftDocument = props.published as
      | (SanityDocument & Oppdateringsvarsel)
      | null;

    const lastVerified = verifiedDocument?.updateInfo?.lastVerified;
    const lastVerifiedDraft = verifiedDraftDocument?.updateInfo?.lastVerified;

    const cancelAction = () => {
      setVerifyOpen(false);
      setPublishOpen(false);
    };

    const verifyContent = () => {
      props.published
        ? patch.execute(
            [
              {
                set: {
                  updateInfo: {
                    lastVerified: format(new Date(), "yyyy-MM-dd"),
                  },
                },
              },
            ],
            props.published,
          )
        : patch.execute(
            [
              {
                set: {
                  updateInfo: {
                    lastVerified: format(new Date(), "yyyy-MM-dd"),
                  },
                  publishedAt: new Date().toISOString(),
                },
              },
            ],
            props.published ?? {},
          );
    };

    // Publish action
    if (!props.published) {
      return {
        ...originalPublishDescription,
        label: "Publiser",
        onHandle: () => {
          setPublishOpen(true);
        },
        dialog: publishOpen && {
          type: "dialog",
          header: "Kvalitetssjekk før publisering",
          onClose: () => setPublishOpen(false),
          content: (
            <>
              <QualityCheckContent type="publishContent" />
              <div className="flex justify-end gap-4">
                <Button variant="tertiary" onClick={cancelAction}>
                  Nei, avbryt
                </Button>
                <Button
                  onClick={() => {
                    verifyContent();
                    publish.execute();
                    props.onComplete();
                    setPublishOpen(false);
                  }}
                  variant="primary"
                  size="medium"
                >
                  Ja, publiser
                </Button>
              </div>
            </>
          ),
        },
      };
    }
    // Update content action
    if (
      props.published &&
      (differenceInMonths(new Date(), new Date(lastVerified ?? new Date())) <
        6 ||
        differenceInMonths(
          new Date(),
          new Date(lastVerifiedDraft ?? new Date()),
        ) < 6)
    ) {
      return {
        ...originalPublishDescription,
        label: "Oppdater",
        tone: "primary",
        onHandle: () => {
          publish.execute();
          props.onComplete();
        },
      };
    }

    const verifiedStatus =
      differenceInMonths(new Date(), new Date(lastVerified ?? new Date())) < 6
        ? "pre"
        : "post";
    // Approve content action
    return {
      label: "Godkjenn innhold",
      onHandle: () => {
        setVerifyOpen(true);
      },
      tone: "positive",
      dialog: verifyOpen && {
        type: "dialog",
        header: "Kvalitetssjekk før publisering",
        onClose: () => setVerifyOpen(false),
        content: (
          <>
            <QualityCheckContent type={`${verifiedStatus}Verify`} />
            <div className="flex justify-end gap-4">
              <Button variant="tertiary" onClick={cancelAction}>
                Nei, avbryt
              </Button>
              <Button
                onClick={() => {
                  verifyContent();
                  publish.execute();
                  props.onComplete();
                  setVerifyOpen(false);
                }}
              >
                Ja, godkjenn
              </Button>
            </div>
          </>
        ),
      },
    };
  };

  return WrappedFocus;
};

interface QualityCheckContentProps {
  type: "publishContent" | "preVerify" | "postVerify";
}

export const QualityCheckContent = ({ type }: QualityCheckContentProps) => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const { data, error } = useSWR(`*[_id == "publication_flow"][0]`, (query) =>
    client.fetch(query),
  );

  if (error) {
    return <div>Kan ikke hente sjekkliste for kvalitetssjekk...</div>;
  }

  const blocks = data?.[type];

  return <SanityBlockContent blocks={blocks ?? []} />;
};
