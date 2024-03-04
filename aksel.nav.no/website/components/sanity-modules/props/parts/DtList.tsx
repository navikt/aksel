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
      as="dl"
      className="dtlist block overflow-x-auto last-of-type:rounded-b"
    >
      <div>
        {prop.type && (
          <div className="my-4 flex px-3 text-base">
            <dt>
              <div className="min-w-24 font-semibold">Type: </div>
            </dt>
            <dd>
              <code className="text-sm">
                {Highlighter({ type: prop.type })}
              </code>
            </dd>
          </div>
        )}
        {prop.defaultValue && (
          <div className="flex px-3 text-base">
            <dt>
              <div className="min-w-24 font-semibold">Default: </div>
            </dt>
            <dd>
              <div>{Highlighter({ type: prop.defaultValue })}</div>
            </dd>
          </div>
        )}
        {prop.description && (
          <div className="my-4 flex px-3">
            <dt>
              <div className="min-w-24 text-base font-semibold">
                Description:
              </div>
            </dt>

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
    </BodyShort>
  );
};
