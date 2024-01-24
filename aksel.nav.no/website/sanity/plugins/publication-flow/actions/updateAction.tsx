import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  useDocumentOperation,
} from "sanity";
import { CloudUpIcon } from "@navikt/aksel-icons";

export const createWrappedUpdateAction = (): DocumentActionComponent => {
  const WrappedUpdate = (
    props: DocumentActionProps,
  ): DocumentActionDescription | null => {
    const { publish } = useDocumentOperation(props.id, props.type);

    if (props.published) {
      return {
        label: "Oppdater",
        tone: "primary",
        icon: CloudUpIcon,
        onHandle: () => {
          publish.execute();
          props.onComplete();
        },
      };
    }
  };

  return WrappedUpdate;
};
