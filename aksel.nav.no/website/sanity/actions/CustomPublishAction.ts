import { format } from "date-fns";
import {
  definePlugin,
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  useDocumentOperation,
} from "sanity";

const includedSchemas: string[] = ["testDoc"];

const createWrappedPublishAction = (publishAction: DocumentActionComponent) => {
  const WrappedPublish = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const originalPublishDescription = publishAction(props);
    const { patch, publish } = useDocumentOperation(props.id, props.type);

    return (
      originalPublishDescription && {
        ...originalPublishDescription,
        label: "Publish 2.0",
        onHandle: () => {
          !props.published &&
            patch.execute(
              [
                {
                  set: {
                    updateInfo: {
                      lastVerified: format(new Date(), "yyyy-MM-dd"),
                    },
                  },
                },
              ],
              props
            );
          publish.execute();
          props.onComplete();
        },
      }
    );
  };

  return WrappedPublish;
};

export const customPublish = definePlugin({
  name: "custom-publish-action",
  document: {
    actions: (prev, { schemaType }) => {
      return prev.map((action) => {
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
