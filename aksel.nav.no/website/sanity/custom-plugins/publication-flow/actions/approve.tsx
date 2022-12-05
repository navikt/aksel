import { Button } from "@navikt/ds-react";
import { differenceInMonths, format } from "date-fns";
import { useState } from "react";
import {
  DocumentActionDescription,
  DocumentActionProps,
  useDocumentOperation,
} from "sanity";

import { PublishIcon } from "@sanity/icons";

export const createWrappedApproveAction = () => {
  const WrappedApprove = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const { patch } = useDocumentOperation(props.id, props.type);
    const [dialogOpen, setDialogOpen] = useState(false);
    const lastVerified = props.published?.updateInfo?.["lastVerified"];

    const verifyContent = () => {
      patch.execute(
        [
          {
            set: {
              "updateInfo.lastVerified": format(new Date(), "yyyy-MM-dd"),
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

    const verifiedStatus =
      differenceInMonths(new Date(), new Date(lastVerified)) < 6
        ? "pre"
        : "post";

    return {
      label: "Godkjenn innhold",
      onHandle: () => {
        setDialogOpen(true);
      },
      icon: PublishIcon,
      dialog: dialogOpen && {
        type: "dialog",
        header: "Kvalitetssjekk",
        onClose: () => setDialogOpen(false),
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

  return WrappedApprove;
};
