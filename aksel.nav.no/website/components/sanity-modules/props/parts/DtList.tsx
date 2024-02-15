import dynamic from "next/dynamic";
import { Detail, Skeleton } from "@navikt/ds-react";
import { Highlighter } from "./Highlight";

const LazyDescription = dynamic(() => import("./DtListDescription"), {
  ssr: false,
  loading: () => <Skeleton />,
});

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
        <span className="font-mono font-semibold">{`${prop.name}${
          prop?.required ? "" : "?"
        } `}</span>
        <span className="font-mono">
          {prop.type ? <>{Highlighter({ type: prop.type })}</> : ""}
        </span>
      </dt>
      {prop.defaultValue && (
        <dd className="text-m mt-1">
          <span className="font-size-2">default: </span>
          <span>{Highlighter({ type: prop.defaultValue })}</span>
        </dd>
      )}
      {prop.description && (
        <LazyDescription>{prop.description}</LazyDescription>
      )}
      {prop.name === "ref" && prop.type.includes("Ref<") && (
        <dd className="mt-3 text-base">
          {`${parent} extends ${prop.type.slice(
            prop.type.indexOf("<") + 1,
            prop.type.lastIndexOf(">"),
          )}`}
        </dd>
      )}
    </Detail>
  );
};
