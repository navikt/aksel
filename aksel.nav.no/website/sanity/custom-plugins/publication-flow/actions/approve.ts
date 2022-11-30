import {
  DocumentActionDescription,
  DocumentActionProps,
  useDocumentOperation,
} from "sanity";

export const createWrappedApproveAction = () => {
  const WrappedApprove = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const { patch, publish } = useDocumentOperation(props.id, props.type);

    return {
      label: "Godkjenn innhold",
      onHandle: () => {
        console.log("APPROVED");
      },
    };
  };

  return WrappedApprove;
};
