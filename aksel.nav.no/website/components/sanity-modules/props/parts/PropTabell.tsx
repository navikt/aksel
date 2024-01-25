import { BodyShort, Heading } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { PropTableT } from "@/types";
import { DtList } from "./DtList";

type PropTableProps = {
  komponent: PropTableT;
};

const PropTable = ({ komponent }: PropTableProps) => {
  return (
    <div>
      <Heading
        size="xsmall"
        level="3"
        className="scroll-m-8 rounded-t-lg border border-b-0 border-gray-300 bg-gray-50 p-2"
        id={komponent._key}
      >
        {komponent?.title ? komponent.title : "Props"}
      </Heading>

      <div className="toc-ignore relative mb-8">
        {komponent?.propref?.proplist?.length === 0 && (
          <div className="mb-8 rounded-b-lg border border-gray-300 p-2">
            <BodyShort>Fant ingen props for denne komponenten.</BodyShort>
          </div>
        )}

        <dl>
          {komponent?.overridable && (
            <DtList
              prop={{
                description: "OverridableComponent-api",
                required: false,
                name: "as",
                type: "React.ElementType",
              }}
              parent={komponent?.title ?? ""}
            />
          )}
          {komponent?.propref?.proplist?.map((prop) => (
            <DtList
              key={prop.name}
              prop={prop}
              parent={komponent?.title ?? ""}
            />
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
