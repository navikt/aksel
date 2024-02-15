import { lazy } from "react";
import { Detail, Tooltip } from "@navikt/ds-react";
import { Highlighter } from "./Highlight";

const LazyDescription = lazy(() => import("./DtListDescription"));

export const DtList = ({ prop, parent }: { prop: any; parent: string }) => {
  if (prop?.description && prop.description.includes("@private")) {
    return null;
  }

  return (
    <Detail
      as="div"
      className="dtlist block overflow-x-auto border border-t-0 border-gray-300 p-2 first-of-type:border-t last-of-type:rounded-b"
    >
      <dt>
        {!prop.defaultValue ? (
          <span className="font-mono font-semibold">{`${prop.name}${
            prop?.required ? "" : "?"
          } `}</span>
        ) : (
          <Tooltip
            content={`default: ${prop.defaultValue}`}
            arrow={false}
            delay={0}
          >
            <span className="mr-2 cursor-pointer border-b border-dashed border-gray-600 font-mono font-semibold">{`${
              prop.name
            }${prop?.required ? "" : "?"}`}</span>
          </Tooltip>
        )}

        <span className="font-mono">
          {prop.type ? <>{Highlighter({ type: prop.type })}</> : ""}
        </span>
      </dt>
      {prop.description && (
        <LazyDescription>{prop.description}</LazyDescription>
      )}
      {prop.name === "ref" && prop.type.includes("Ref<") && (
        <dd className="mt-2 text-base">
          {`${parent} extends ${prop.type.slice(
            prop.type.indexOf("<") + 1,
            prop.type.lastIndexOf(">"),
          )}`}
        </dd>
      )}
    </Detail>
  );
};
