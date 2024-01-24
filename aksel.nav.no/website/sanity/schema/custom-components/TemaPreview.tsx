import { getPublishedId, useFormValue } from "sanity";
import { Tag } from "@navikt/ds-react";

export function TemaPreview(props) {
  const usedTema = useFormValue(["tema"]) as any[];
  const src = useFormValue(["_type"]) as string;

  return (
    <div className="flex shrink-0 items-center justify-between">
      {props.renderDefault({ ...props, subtitle: "Temaside" })}
      {usedTema &&
        src === "aksel_arikkel" &&
        usedTema.length > 0 &&
        props._id &&
        getPublishedId(props._id) === usedTema[0]._ref && (
          <Tag variant="neutral-filled" size="small">
            HOVEDTEMA
          </Tag>
        )}
    </div>
  );
}
