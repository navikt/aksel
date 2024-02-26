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

  const anonym = props?.subtitle?.includes("Anonym");
  const currentUser =
    editor &&
    editor.find(
      (x) => x?.email === user?.email || x?.alt_email === user?.email,
    );

  return (
    <div className="flex shrink-0 items-center justify-between">
      {props.renderDefault({
        ...props,
        subtitle:
          currentUser && currentUser._id === props?._id
            ? anonym
              ? "Din profil | Anonym"
              : "Din profil"
            : anonym
              ? "Anonym"
              : "",
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
