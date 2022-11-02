import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";
import { BodyShort, Detail, Heading, Tooltip } from "@navikt/ds-react";
import { Highlighter } from "./Highlight";

export type PropT = {
  _type: "komponent";
  _key: string;
  title?: string;
  overridable?: boolean;
  propref?: SanityT.Schema.ds_props;
};

const List = ({ prop, parent }: { prop: any; parent: string }) => {
  if (prop?.description && prop.description.includes("@private")) {
    return null;
  }

  return (
    <Detail
      as="span"
      className="block overflow-x-auto border border-t-0 border-gray-300 p-2 font-mono first-of-type:border-t last-of-type:rounded-b"
    >
      <dt>
        {!prop.defaultValue ? (
          <span className="font-semibold">{`${prop.name}${
            prop?.required ? "" : "?"
          } `}</span>
        ) : (
          <Tooltip content={`${prop.defaultValue}`} arrow={false} delay={0}>
            <span className="mr-2 cursor-pointer border-b border-dashed border-gray-600 font-semibold">{`${
              prop.name
            }${prop?.required ? "" : "?"}`}</span>
          </Tooltip>
        )}

        <span>{prop.type ? <>{Highlighter({ type: prop.type })}</> : ""}</span>
      </dt>
      {prop.description && (
        <dl className="font-sans text-base">{prop.description}</dl>
      )}
      {prop.name === "ref" && prop.type.includes("Ref<") && (
        <dl className="font-sans text-base">
          {`${parent} extends ${prop.type.slice(
            prop.type.indexOf("<") + 1,
            prop.type.lastIndexOf(">")
          )}`}
        </dl>
      )}
    </Detail>
  );
};

const PropTable = ({ komponent }: { komponent: PropT }): JSX.Element => {
  return (
    <div>
      <Heading
        size="xsmall"
        level="3"
        className="scroll-m-8 rounded-t border border-b-0 border-gray-300 bg-gray-50 p-2"
        id={`${komponent._key}`}
      >
        {komponent?.title ? komponent.title : "Props"}
      </Heading>

      <div className="algolia-ignore-index relative mb-8">
        {komponent?.propref?.proplist?.length === 0 && (
          <div className="mb-8 rounded-b border border-gray-300 p-2">
            <BodyShort>Fant ingen props for denne komponenten.</BodyShort>
          </div>
        )}

        <dl>
          {komponent?.overridable && (
            <List
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
            <List key={prop.name} prop={prop} parent={komponent?.title ?? ""} />
          ))}
        </dl>
      </div>
    </div>
  );
};

export default withErrorBoundary(PropTable, "Proptable");
