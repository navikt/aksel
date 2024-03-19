import { BodyShort, Heading } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { PropTableT } from "@/types";
import { DtList } from "./DtList";

type PropTableProps = {
  komponent: PropTableT;
};

const PropTable = ({ komponent }: PropTableProps) => {
  return (
    <div lang="en">
      <Heading
        size="xsmall"
        level="3"
        className="scroll-m-8 rounded-t-lg border border-b-0 border-gray-300 bg-gray-50 p-2"
        id={komponent._key}
      >
        {komponent?.title ? komponent.title : "Props"}
      </Heading>

      <div className="toc-ignore relative mb-8 break-all">
        {komponent?.propref?.proplist?.length === 0 && (
          <div className="mb-8 rounded-b-lg border border-gray-300 p-2">
            <BodyShort>Fant ingen props for denne komponenten.</BodyShort>
          </div>
        )}

        <dl>
          {komponent?.overridable && (
            <div className="border border-t-0 border-gray-300 p-2">
              <dt className="px-2 py-2">
                <Heading
                  size="xsmall"
                  level="4"
                  className="inline-block rounded-medium bg-surface-alt-3-subtle px-1 font-mono text-small font-semibold"
                >
                  as?
                </Heading>
              </dt>
              <dd>
                <DtList
                  prop={{
                    description: "OverridableComponent-api",
                    required: false,
                    name: "as",
                    type: "React.ElementType",
                  }}
                  parent={komponent?.title ?? ""}
                />
              </dd>
            </div>
          )}
          {komponent?.propref?.proplist?.map((prop) => (
            <div
              className="border border-t-0 border-gray-300 p-2 last-of-type:rounded-b-lg"
              key={prop.name}
            >
              <dt className="px-2 pt-2">
                <Heading
                  size="xsmall"
                  level="4"
                  className="inline-block rounded-medium bg-surface-alt-3-subtle px-1 font-mono text-small font-semibold"
                >{`${prop.name}${prop?.required ? "" : "?"}`}</Heading>
              </dt>
              <dd>
                <DtList prop={prop} parent={komponent?.title ?? ""} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default function Component(props: PropTableProps) {
  return (
    <ErrorBoundary boundaryName="Proptable">
      <PropTable {...props} />
    </ErrorBoundary>
  );
}
