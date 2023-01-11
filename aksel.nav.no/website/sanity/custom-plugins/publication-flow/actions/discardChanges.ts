import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from "sanity";

export const createWrappedDiscardChangesAction = (
  discardChangesAction: DocumentActionComponent
) => {
  const WrappedDiscardChanges = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const originalDiscardChangesDescription = discardChangesAction(props);

    return (
      originalDiscardChangesDescription && {
        ...originalDiscardChangesDescription,
        label: "Forkast endringer",
      }
    );
  };

  return WrappedDiscardChanges;
};
