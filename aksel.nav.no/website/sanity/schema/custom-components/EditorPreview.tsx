import { useEffect, useState } from "react";
import {
  getPublishedId,
  useClient,
  useCurrentUser,
  useFormValue,
} from "sanity";
import { Tag } from "@navikt/ds-react";
import { SANITY_API_VERSION } from "@/sanity/config";

export function EditorPreview(props) {
  const editors = useFormValue(["contributors"]) as any[];
  const user = useCurrentUser();
  const client = useClient({ apiVersion: SANITY_API_VERSION });

  const [editor, setEditor] = useState<any[]>([]);

  useEffect(() => {
    client.fetch(`*[_type == "editor"]`).then(setEditor);
  }, [client]);

  const currentUser =
    editor &&
    editor.find(
      (x) =>
        x?.email.toLowerCase() === user?.email.toLowerCase() ||
        x?.alt_email.toLowerCase() === user?.email.toLowerCase(),
    );

  return (
    <div className="flex shrink-0 items-center justify-between">
      {props.renderDefault({
        ...props,
        subtitle:
          currentUser && currentUser._id === props?._id ? "Din profil" : "",
      })}
      {editors &&
        editors.length > 0 &&
        props._id &&
        getPublishedId(props._id) === editors[0]._ref && (
          <Tag variant="neutral-filled" size="small">
            Forfatter
          </Tag>
        )}
    </div>
  );
}
