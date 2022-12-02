import { differenceInMonths, format } from "date-fns";
import { useState } from "react";
import {
  DocumentActionDescription,
  DocumentActionProps,
  useDocumentOperation,
} from "sanity";

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
      dialog: dialogOpen && {
        type: "dialog",
        header: "Kvalitetssjekk",
        onClose: () => setDialogOpen(false),
        content: (
          <>
            <h3>Godkjenningsdialog...</h3>
            <p>{updateDialogContent.description[verifiedStatus]}</p>
            <ul>
              <li>{updateDialogContent.checks[verifiedStatus]}</li>
            </ul>
            <button onClick={() => verifyContent()}>Godkjenn</button>
          </>
        ),
      },
    };
  };

  return WrappedApprove;
};
