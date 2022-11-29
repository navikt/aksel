import {
  definePlugin,
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from "sanity";

const includedSchemas: string[] = ["testDoc"];

const createWrappedPublishAction = (publishAction: DocumentActionComponent) => {
  const wrappedPublish = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const originalPublishDescription = publishAction(props);

    return (
      originalPublishDescription && {
        ...originalPublishDescription,
        label: "Publish 2.0",
      }
    );
  };

  return wrappedPublish;
};

export const customPublish = definePlugin({
  name: "custom-publish-action",
  document: {
    actions: (prev, { schemaType }) => {
      return prev.map((action) => {
        console.log(schemaType);
        if (
          includedSchemas.some((e) => e === schemaType) &&
          action.action === "publish"
        ) {
          return createWrappedPublishAction(action);
        }
        return action;
      });
    },
  },
});
