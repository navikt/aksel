import { BodyShort, Heading } from "@navikt/ds-react";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";
import { PropsSeksjonDescription } from "./PropsSeksjon.decription";
import { PropsSeksjonExample } from "./PropsSeksjon.example";
import { PropsSeksjonHighlight } from "./PropsSeksjon.highlight";

type PropsSeksjonT = ExtractPortableComponentProps<"props_seksjon">;
type PropsSeksjonComponentT = NonNullable<
  PropsSeksjonT["value"]["komponenter"]
>[number];

type PropsSeksjonPropRefListT = NonNullable<
  PropsSeksjonComponentT["propref"]
>["proplist"];

function PropsSeksjon(props: ExtractPortableComponentProps<"props_seksjon">) {
  const { komponenter, title } = props.value;

  if (!komponenter || komponenter.length === 0 || !title) {
    return null;
  }

  return (
    <div data-block-margin="space-28">
      {komponenter.map((prop) => (
        <PropTable component={prop} key={prop?._key} />
      ))}
    </div>
  );
}

function PropTable({ component }: { component: PropsSeksjonComponentT }) {
  const { propref, title, overridable } = component;

  const propList =
    propref?.proplist?.filter(
      (prop) => !prop.description?.includes("@private"),
    ) ?? [];

  if (propList.length === 0) {
    return null;
  }

  return (
    <div lang="en">
      <Heading
        size="xsmall"
        level="3"
        className="scroll-m-8 rounded-t-lg border border-b-0 border-gray-300 bg-gray-50 p-2"
        id={component._key}
      >
        {title ?? "Props"}
      </Heading>

      <div className="toc-ignore relative mb-8">
        <dl>
          {overridable && (
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
                    _type: "prop",
                    _key: "overridable",
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
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function DtList({
  prop,
}: {
  prop: NonNullable<PropsSeksjonPropRefListT>[number];
}) {
  return (
    <BodyShort as="ul" className="dtlist overflow-x-auto">
      {prop.type && (
        <li className="my-3 flex flex-col break-all px-3 text-base md:flex-row">
          <div className="min-w-24 font-semibold">Type: </div>
          <code className="mt-05 text-sm">
            <PropsSeksjonHighlight type={prop.type} />
          </code>
        </li>
      )}
      {prop.defaultValue && (
        <li className="my-3 flex flex-col px-3 text-base md:flex-row">
          <div className="min-w-24 font-semibold">Default: </div>
          <div>
            <PropsSeksjonHighlight type={prop.defaultValue} />
          </div>
        </li>
      )}
      <PropsSeksjonDescription
        description={prop.description}
        params={prop.params}
      />
      <PropsSeksjonExample code={prop.example} />
    </BodyShort>
  );
}

export { PropsSeksjon };
