import { format } from "date-fns";
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

    // Publish action
    if (!props.published) {
      return {
        ...originalPublishDescription,
        label: "Publiser",
        onHandle: () => {
          !props.published &&
            patch.execute(
              [
                {
                  set: {
                    updateInfo: {
                      lastVerified: format(new Date(), "yyyy-MM-dd"),
                    },
                  },
                },
              ],
              props
            );
          publish.execute();
          props.onComplete();
        },
      };
    } else {
      // Approve content action
      return {
        label: "Godkjenn innhold",
        onHandle: () => {
          setDialogOpen(true);
        },
        tone: "positive",
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
    }
  };

  return WrappedFocus;
};
