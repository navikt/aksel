import { useState, useEffect } from "react";
import {
  useDocumentOperation,
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from "sanity";

export const createWrappedDefaultPublish = (
  publishAction: DocumentActionComponent
) => {
  const DefaultPublish = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const originalAction = publishAction(props);
    const { patch, publish } = useDocumentOperation(props.id, props.type);
    const [isPublishing, setIsPublishing] = useState(false);

    useEffect(() => {
      if (isPublishing && !props.draft) {
        setIsPublishing(false);
      }
    }, [props.draft, isPublishing]);

    return {
      ...originalAction,
      label: isPublishing ? "Publiserer..." : "Publiser",
      tone: "positive",
      onHandle: () => {
        setIsPublishing(true);
        !props.published &&
          patch.execute(
            [{ set: { publishedAt: new Date().toISOString() } }],
            props.published
          );
        publish.execute();

        props.onComplete();
      },
    };
  };

  return DefaultPublish;
};
