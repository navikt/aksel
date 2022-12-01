import { Badge } from "@sanity/ui";
import { getPublishedId, useFormValue } from "sanity";

export function TemaPreview(props) {
  const usedTema = useFormValue(["tema"]) as any[];
  return (
    <div className="flex shrink-0 items-center justify-between">
      {props.renderDefault({ ...props, subtitle: "Temaside" })}
      {usedTema &&
        usedTema.length > 0 &&
        props._id &&
        getPublishedId(props._id) === usedTema[0]._ref && (
          <Badge>HOVEDTEMA</Badge>
        )}
    </div>
  );
}
