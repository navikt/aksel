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
    const originalPublishDescription = unpublishAction(props);
    console.log(originalPublishDescription);

    return (
      originalPublishDescription && {
        ...originalPublishDescription,
        label: "Avpubliser",
        title:
          "Avpubliserer siden slik at den ikke ligger ute på interwebsen lenger",
      }
    );
  };

  return WrappedUnpublish;
};
