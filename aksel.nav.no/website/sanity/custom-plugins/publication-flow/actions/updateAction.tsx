import { PublishIcon } from "@sanity/icons";
import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  useDocumentOperation,
} from "sanity";

export const createWrappedUpdateAction = (): DocumentActionComponent => {
  const WrappedUpdate = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const { publish } = useDocumentOperation(props.id, props.type);

    if (props.published) {
      return {
        label: "Oppdater",
        tone: "primary",
        icon: PublishIcon,
        onHandle: () => {
          publish.execute();
          props.onComplete();
        },
      };
    }
  };

  return WrappedUpdate;
};
