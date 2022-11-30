import { format } from "date-fns";
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
            <h3>Har du husket å bla bla bla...</h3>
            <button onClick={() => verifyContent()}>Godkjenn</button>
          </>
        ),
      },
    };
  };

  return WrappedApprove;
};
