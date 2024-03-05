import dynamic from "next/dynamic";
import { BodyShort, Skeleton } from "@navikt/ds-react";
import { AkselTable, AkselTableRow } from "@/web/Table";
import { Highlighter } from "./Highlight";

const LazyDescription = dynamic(() => import("./DtListDescription"), {
  ssr: false,
  loading: () => <Skeleton />,
});

const LazyExample = dynamic(() => import("./DtListExample"), {
  ssr: false,
  loading: () => <Skeleton />,
});

export const DtList = ({ prop }: { prop: any; parent: string }) => {
  if (prop?.description && prop.description.includes("@private")) {
    return null;
  }

  return (
    <BodyShort
      as="ul"
      className="dtlist overflow-x-auto last-of-type:rounded-b"
    >
      {prop.type && (
        <li className="my-4 flex px-3 text-base">
          <div className="min-w-24 font-semibold">Type: </div>
          <code className="text-sm">{Highlighter({ type: prop.type })}</code>
        </li>
      )}
      {prop.defaultValue && (
        <li className="flex px-3 text-base">
          <div className="min-w-24 font-semibold">Default: </div>
          <div>{Highlighter({ type: prop.defaultValue })}</div>
        </li>
      )}
      {prop.description && (
        <li className="my-4 flex px-3">
          <div className="min-w-24 text-base font-semibold">Description:</div>

          <div>
            <LazyDescription>{prop.description}</LazyDescription>
            {prop.params && (
              <AkselTable th={[{ text: "Param" }, { text: "Description" }]}>
                {prop.params.map((param: string, i: number) => (
                  <AkselTableRow
                    key={i}
                    tr={[
                      { text: param.split(" ")[0] },
                      { text: param.slice(param.indexOf(" ") + 1) },
                    ]}
                  />
                ))}
              </AkselTable>
            )}
            {prop.example && <LazyExample>{prop.example}</LazyExample>}
          </div>
        </li>
      )}
    </BodyShort>
  );
};
