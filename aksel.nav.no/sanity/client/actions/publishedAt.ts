// https://www.sanity.io/schemas/make-a-field-read-only-after-publishing-once-d87bf5f6
import { useState, useEffect } from "react";
import { useDocumentOperation, useValidationStatus } from "@sanity/react-hooks";
import PublishIcon from "part:@sanity/base/publish-icon";

export default function SetAndPublishAction(props) {
  const { patch, publish }: any = useDocumentOperation(props.id, props.type);
  const { isValidating, markers }: any = useValidationStatus(
    props.id,
    props.type
  );
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    // if the isPublishing state was set to true and the draft has changed
    // to become `null` the document has been published
    if (isPublishing && !props.draft) {
      setIsPublishing(false);
    }
  }, [props.draft]);

  console.log(markers);

  return {
    disabled:
      publish.disabled ||
      isValidating ||
      markers.some((x) => x?.level === "error"),
    label: isPublishing ? "Publishing…" : "Publish",
    color: "success",
    icon: PublishIcon,

    onHandle: () => {
      // This will update the button text
      setIsPublishing(true);

      // Set publishedAt to current date and time
      !props.published &&
        patch.execute([{ set: { publishedAt: new Date().toISOString() } }]);

      // Perform the publish
      publish.execute();

      // Signal that the action is completed
      props.onComplete();
    },
  };
}
