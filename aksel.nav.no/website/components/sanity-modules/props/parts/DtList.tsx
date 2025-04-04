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

// sync with docgen manipulation, on two sides of the fence
type Prop = Partial<{
  defaultValue: string;
  description: string;
  name: string;
  parent: {
    fileName: string;
    name: string;
  };
  declarations: {
    fileName: string;
    name: string;
  }[];
  required: boolean;
  type: string;
  params: string[];
  return: string;
  example: string;
  deprecated: string;
}>;

export const DtList = ({ prop }: { prop: Prop }) => {
  return (
    <BodyShort as="ul" className="dtlist overflow-x-auto">
      {prop.deprecated && (
        <li className="my-3 flex flex-col px-3 text-base text-[--ax-text-danger-subtle] md:flex-row">
          <div className="min-w-24 font-semibold">Deprecated: </div>
          <div>{prop.deprecated}</div>
        </li>
      )}
      {prop.type && (
        <li className="my-3 flex flex-col break-all px-3 text-base md:flex-row">
          <div className="min-w-24 font-semibold">Type: </div>
          <code className="mt-05 text-sm">
            {Highlighter({ type: prop.type })}
          </code>
        </li>
      )}
      {prop.defaultValue && (
        <li className="my-3 flex flex-col px-3 text-base md:flex-row">
          <div className="min-w-24 font-semibold">Default: </div>
          <div>{Highlighter({ type: prop.defaultValue })}</div>
        </li>
      )}
      {prop.description && (
        <li className="my-3 flex flex-col px-3 md:flex-row">
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
          </div>
        </li>
      )}
      {prop.example && (
        <li className="my-3 flex flex-col px-3 text-base md:flex-row">
          <div className="min-w-24 font-semibold">Example: </div>
          <LazyExample>{prop.example}</LazyExample>
        </li>
      )}
    </BodyShort>
  );
};
