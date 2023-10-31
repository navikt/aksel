import { Detail, Tooltip } from "@navikt/ds-react";
import { Highlighter } from "./Highlight";

export const DtList = ({ prop, parent }: { prop: any; parent: string }) => {
  if (prop?.description && prop.description.includes("@private")) {
    return null;
  }

  return (
    <Detail
      as="div"
      className="block overflow-x-auto border border-t-0 border-gray-300 p-2 font-mono first-of-type:border-t last-of-type:rounded-b"
    >
      <dt>
        {!prop.defaultValue ? (
          <span className="font-semibold">{`${prop.name}${
            prop?.required ? "" : "?"
          } `}</span>
        ) : (
          <Tooltip
            content={`default: ${prop.defaultValue}`}
            arrow={false}
            delay={0}
          >
            <span className="mr-2 cursor-pointer border-b border-dashed border-gray-600 font-semibold">{`${
              prop.name
            }${prop?.required ? "" : "?"}`}</span>
          </Tooltip>
        )}

        <span>{prop.type ? <>{Highlighter({ type: prop.type })}</> : ""}</span>
      </dt>
      {prop.description && (
        <dd className="whitespace-pre-wrap font-sans text-base">
          {prop.description}
        </dd>
      )}
      {prop.name === "ref" && prop.type.includes("Ref<") && (
        <dd className="font-sans text-base">
          {`${parent} extends ${prop.type.slice(
            prop.type.indexOf("<") + 1,
            prop.type.lastIndexOf(">")
          )}`}
        </dd>
      )}
    </Detail>
  );
};
