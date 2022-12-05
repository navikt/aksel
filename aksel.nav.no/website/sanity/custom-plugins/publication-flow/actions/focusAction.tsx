import { Button } from "@navikt/ds-react";
import { differenceInMonths, formatISO } from "date-fns";
import { useState } from "react";
import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  useDocumentOperation,
} from "sanity";

export const createWrappedFocusAction = (action: DocumentActionComponent) => {
  const WrappedFocus = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const { patch, publish } = useDocumentOperation(props.id, props.type);
    const originalPublishDescription = action(props);
    const [verifyOpen, setVerifyOpen] = useState(false);
    const [publishOpen, setPublishOpen] = useState(false);
    const lastVerified = props.published?.updateInfo?.["lastVerified"];
    const lastVerifiedDraft = props.draft?.updateInfo?.["lastVerified"];

    const verifyContent = () => {
      patch.execute(
        [
          {
            set: {
              updateInfo: {
                lastVerified: formatISO(new Date()),
              },
            },
          },
        ],
        props.published
      );
    };

    const updateDialogContent = {
      description: {
        pre: "Før du godkjenner innholdet, har du gjort dette?",
        post: "Artikkelen er over 6mnd gammel og må godkjennes på nytt. Før du godkjenner innholdet, har du gjort dette?",
      },
      checks: {
        pre: "Hovedinnhold",
        post: "Hovedinnhold",
      },
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
          header: "Kvalitetssjekk",
          onClose: () => setPublishOpen(false),
          content: (
            <>
              <h3>Publiseringsdialog...</h3>
              <p>TO DO: Fyll innhold her</p>
              <div className="flex justify-end gap-4">
                <Button variant="tertiary">Nei, avbryt</Button>
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
      (differenceInMonths(new Date(), new Date(lastVerified)) < 6 ||
        differenceInMonths(new Date(), new Date(lastVerifiedDraft)) < 6)
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
    } else {
      const verifiedStatus =
        differenceInMonths(new Date(), new Date(lastVerified)) < 6
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
          header: "Kvalitetssjekk",
          onClose: () => setVerifyOpen(false),
          content: (
            <>
              <h3>Godkjenningsdialog...</h3>
              <p>TO DO: Fyll innhold her</p>
              <p>{updateDialogContent.description[verifiedStatus]}</p>
              <ul>
                <li>{updateDialogContent.checks[verifiedStatus]}</li>
              </ul>
              <div className="flex justify-end gap-4">
                <Button variant="tertiary">Nei, avbryt</Button>
                <Button
                  onClick={() => {
                    verifyContent();
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
    }
  };

  return WrappedFocus;
};
