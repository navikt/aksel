import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@navikt/ds-react";
import InlineCode from "@/web/InlineCode";

const LinkWrapper = ({ children }) => {
  return <Link href={children}>{children}</Link>;
};

const DtListDescription = ({ children }) => {
  return (
    <div className="mr-2 flex flex-col gap-2 whitespace-pre-wrap text-base">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{ code: InlineCode, a: LinkWrapper }}
      >
        {children}
      </Markdown>
    </div>
  );
};

export default DtListDescription;
