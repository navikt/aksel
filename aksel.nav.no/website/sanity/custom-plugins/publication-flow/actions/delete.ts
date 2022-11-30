import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from "sanity";

export const createWrappedDeleteAction = (
  deleteAction: DocumentActionComponent
) => {
  const WrappedDelete = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const originalPublishDescription = deleteAction(props);
    console.log(originalPublishDescription);

    return (
      originalPublishDescription && {
        ...originalPublishDescription,
        label: "Slett",
        title: "Sletter dokumentet",
      }
    );
  };

  return WrappedDelete;
};
