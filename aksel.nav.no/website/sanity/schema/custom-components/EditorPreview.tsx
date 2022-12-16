import { Badge } from "@sanity/ui";
import { useEffect, useState } from "react";
import {
  getPublishedId,
  useFormValue,
  useCurrentUser,
  useClient,
} from "sanity";

export function EditorPreview(props) {
  const editors = useFormValue(["contributors"]) as any[];
  const user = useCurrentUser();
  const client = useClient({ apiVersion: "2021-06-07" });

  const [editor, setEditor] = useState<any[]>([]);

  useEffect(() => {
    client.fetch(`*[_type == "editor"]`).then(setEditor);
  }, [client]);

  const anonym = props?.subtitle?.includes("Anonym");
  const currentUser =
    editor && editor.find((x) => x?.user_id?.current === user?.id);
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
          <Badge>Forfatter</Badge>
        )}
    </div>
  );
}
