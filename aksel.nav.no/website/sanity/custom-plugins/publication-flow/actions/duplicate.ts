import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from "sanity";

export const createWrappedDuplicateAction = (
  duplicateAction: DocumentActionComponent
) => {
  const WrappedDuplicate = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const originalDuplicateDescription = duplicateAction(props);
    console.log(originalDuplicateDescription);

    return (
      originalDuplicateDescription && {
        ...originalDuplicateDescription,
        label: "Dupliser",
        title: "Dupliser dokumentet",
      }
    );
  };

  return WrappedDuplicate;
};
