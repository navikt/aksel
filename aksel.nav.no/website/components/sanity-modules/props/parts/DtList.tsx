import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Detail, Link, Tooltip } from "@navikt/ds-react";
import InlineCode from "@/web/InlineCode";
import { Highlighter } from "./Highlight";

const LinkWrapper = ({ children }) => {
  return <Link href={children}>{children ? children : ""}</Link>;
};

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
        {!prop.defaultValue ? (
          <span className="font-mono font-semibold">{`${prop.name}${
            prop?.required ? "" : "?"
          } `}</span>
        ) : (
          <Tooltip
            content={`default: ${prop.defaultValue}`}
            arrow={false}
            delay={0}
          >
            <span className="mr-2 cursor-pointer border-b border-dashed border-gray-600 font-mono font-semibold">{`${
              prop.name
            }${prop?.required ? "" : "?"}`}</span>
          </Tooltip>
        )}

        <span className="font-mono">
          {prop.type ? <>{Highlighter({ type: prop.type })}</> : ""}
        </span>
      </dt>
      {prop.description && (
        <dd className="ml-2 mr-2 whitespace-pre-wrap pl-2 text-base">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{ code: InlineCode, a: LinkWrapper }}
          >
            {prop.description}
          </Markdown>
        </dd>
      )}
      {prop.name === "ref" && prop.type.includes("Ref<") && (
        <dd className="mt-2 text-base">
          {`${parent} extends ${prop.type.slice(
            prop.type.indexOf("<") + 1,
            prop.type.lastIndexOf(">"),
          )}`}
        </dd>
      )}
    </Detail>
  );
};
