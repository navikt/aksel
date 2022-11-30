import { format } from "date-fns";
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

    return {
      label: "Godkjenn innhold",
      onHandle: () => {
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
      },
    };
  };

  return WrappedApprove;
};
