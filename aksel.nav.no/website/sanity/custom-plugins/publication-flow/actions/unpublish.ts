import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from "sanity";

export const createWrappedUnpublishAction = (
  unpublishAction: DocumentActionComponent
) => {
  const WrappedUnpublish = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const originalUnpublishDescription = unpublishAction(props);
    console.log(originalUnpublishDescription);

    return (
      originalUnpublishDescription && {
        ...originalUnpublishDescription,
        label: "Avpubliser",
        title:
          "Avpubliserer siden slik at den ikke ligger ute på interwebsen lenger",
      }
    );
  };

  return WrappedUnpublish;
};
