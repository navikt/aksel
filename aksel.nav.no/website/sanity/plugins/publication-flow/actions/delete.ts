import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from "sanity";

export const createWrappedDeleteAction = (
  deleteAction: DocumentActionComponent,
) => {
  const WrappedDelete = (
    props: DocumentActionProps,
  ): DocumentActionDescription | null => {
    const originalDeleteDescription = deleteAction(props);

    return (
      originalDeleteDescription && {
        ...originalDeleteDescription,
        label: "Slett",
        title: "Sletter dokumentet",
      }
    );
  };

  return WrappedDelete;
};
