import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from "sanity";

export const createWrappedRestoreAction = (
  restoreAction: DocumentActionComponent
) => {
  const WrappedRestore = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const originalRestoreDescription = restoreAction(props);

    return (
      originalRestoreDescription && {
        ...originalRestoreDescription,
        label: "Gjenopprett",
        title: "Gjenopprett til denne versjonen",
      }
    );
  };

  return WrappedRestore;
};
