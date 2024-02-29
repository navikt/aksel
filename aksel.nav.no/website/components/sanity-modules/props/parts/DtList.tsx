import dynamic from "next/dynamic";
import { BodyShort, Detail, Skeleton, Table } from "@navikt/ds-react";
import { Highlighter } from "./Highlight";

const LazyDescription = dynamic(() => import("./DtListDescription"), {
  ssr: false,
  loading: () => <Skeleton />,
});

const LazyExample = dynamic(() => import("./DtListExample"), {
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
        <>
          <span className="font-size-2">default: </span>
          <span>{Highlighter({ type: prop.defaultValue })}</span>
        </>
      )}
      {prop.description && (
        <LazyDescription>{prop.description}</LazyDescription>
      )}
      {prop.params && (
        <div className="mb-2 ml-2 mt-6">
          <span className="block text-lg font-semibold">Params:</span>
          <Table className="m-2 w-[95%]">
            <Table.Body className="border-t border-grayalpha-500">
              {prop.params.map((param: string, i: number) => (
                <Table.Row key={i}>
                  <Table.HeaderCell>{param.split(" ")[0]}</Table.HeaderCell>
                  <Table.DataCell>
                    {param.slice(param.indexOf(" ") + 1)}
                  </Table.DataCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
      {prop.return && (
        <div className="mb-2 ml-2 mt-6">
          <span className="block text-lg font-semibold">Return:</span>
          <BodyShort className="ml-4">{prop.return}</BodyShort>
        </div>
      )}
      {prop.example && <LazyExample>{prop.example}</LazyExample>}

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
