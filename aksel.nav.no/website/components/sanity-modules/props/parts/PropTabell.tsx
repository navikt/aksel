import { Heading } from "@navikt/ds-react";
import ErrorBoundary from "@/error-boundary";
import { PropTableT } from "@/types";
import { DtList } from "./DtList";

type PropTableProps = {
  komponent: PropTableT;
};

const PropTable = ({ komponent }: PropTableProps) => {
  const propList =
    komponent?.propref?.proplist
      ?.filter((prop) => !prop.description?.includes("@private"))
      .sort((prop_a, prop_b) => {
        let comparator_value = 0;

        if ("deprecated" in prop_a) {
          comparator_value += 1;
        }
        if ("deprecated" in prop_b) {
          comparator_value -= 1;
        }
        return comparator_value;
      }) ?? [];

  if (propList.length === 0) {
    return null;
  }

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

      <div className="toc-ignore relative mb-8">
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
                />
              </dd>
            </div>
          )}
          {propList.map((prop) => (
            <div
              className="border border-t-0 border-gray-300 p-2 last-of-type:rounded-b-lg"
              key={prop.name}
            >
              <PropEntry prop={prop} />
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

const PropEntry = ({
  prop,
}: {
  prop: NonNullable<
    NonNullable<PropTableProps["komponent"]["propref"]>["proplist"]
  >[0];
}) => {
  if (prop.deprecated) {
    return (
      <details>
        <summary>
          <dt className="inline-block px-2 pt-2">
            <Heading
              size="xsmall"
              level="4"
              className="mr-2 inline-block rounded-medium bg-surface-danger-subtle px-1 font-mono text-small font-semibold text-surface-danger-active line-through"
            >{`${prop.name}${prop?.required ? "" : "?"}`}</Heading>
            <span className="text-surface-danger">
              <span className="font-bold">Deprecated: </span>
              {prop.deprecated}
            </span>
          </dt>
        </summary>
        <dd>
          <DtList prop={prop} />
        </dd>
      </details>
    );
  }
  return (
    <>
      <dt className="px-2 pt-2">
        <Heading
          size="xsmall"
          level="4"
          className="inline-block rounded-medium bg-surface-alt-3-subtle px-1 font-mono text-small font-semibold"
        >{`${prop.name}${prop?.required ? "" : "?"}`}</Heading>
      </dt>
      <dd>
        <DtList prop={prop} />
      </dd>
    </>
  );
};

export default function Component(props: PropTableProps) {
  return (
    <ErrorBoundary boundaryName="Proptable">
      <PropTable {...props} />
    </ErrorBoundary>
  );
}
