import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@navikt/ds-react";
import { Code } from "../typography/Code";

function PropsSeksjonDescription({
  description,
  params,
}: {
  description?: string;
  params?: string[];
}) {
  if (!description) {
    return null;
  }

  return (
    <li className="my-3 flex flex-col px-3 md:flex-row">
      <div className="min-w-24 text-base font-semibold">Description:</div>

      <div>
        <div className="mr-2 flex flex-col gap-2 text-base">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: Code,
              a: LinkWrapper,
            }}
          >
            {description}
          </Markdown>
        </div>
        {params && (
          <ul>
            {params.map((param) => {
              const [name, ...desc] = param.split(" ");
              return (
                <li key={param}>
                  <strong>{name}: </strong>
                  {desc.join(" ")}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </li>
  );
}

function LinkWrapper({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string;
}) {
  return <Link href={href}>{children}</Link>;
}

export { PropsSeksjonDescription };
