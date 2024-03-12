import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "@navikt/ds-react";
import InlineCode from "@/web/InlineCode";

const LinkWrapper = ({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string;
}) => {
  return <Link href={href}>{children}</Link>;
};

const DtListDescription = ({ children }) => {
  return (
    <div className="mr-2 flex flex-col gap-2 text-base">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: InlineCode,
          a: LinkWrapper,
        }}
      >
        {children}
      </Markdown>
    </div>
  );
};

export default DtListDescription;
