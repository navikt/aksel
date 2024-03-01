import dynamic from "next/dynamic";
import { Detail, Skeleton } from "@navikt/ds-react";
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
    <Detail
      as="dl"
      className="dtlist block overflow-x-auto border border-t-0 border-gray-300 py-2 first-of-type:border-t last-of-type:rounded-b"
    >
      <dt className="px-2">
        <span className="rounded-medium bg-surface-alt-3-subtle px-1 py-05 font-mono text-small font-semibold">{`${
          prop.name
        }${prop?.required ? "" : "?"}`}</span>
      </dt>

      <div className="mt-1">
        {prop.type && (
          <dd className="flex px-3 text-base">
            <div className="min-w-24 font-semibold">Type: </div>
            <div>{Highlighter({ type: prop.type })}</div>
          </dd>
        )}
        {prop.defaultValue && (
          <dd className="flex px-3 text-base">
            <div className="min-w-24 font-semibold">Default: </div>
            <div>{Highlighter({ type: prop.defaultValue })}</div>
          </dd>
        )}
        {prop.description && (
          <div className="flex px-3 py-2">
            <div className="min-w-24 text-base font-semibold">Description:</div>
            <div>
              <LazyDescription>{prop.description}</LazyDescription>

              {prop.params && (
                <dd className="mt-6">
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
                </dd>
              )}
              {prop.example && <LazyExample>{prop.example}</LazyExample>}
            </div>
          </div>
        )}
      </div>
    </Detail>
  );
};
