import { Snippet } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { CodeSnippetT } from "@/types";

const Kode = ({ node }: { node: CodeSnippetT }) => {
  if (!node || !node.code) {
    return null;
  }

  return <Snippet node={node} className="last:mb-0" />;
};

export default withErrorBoundary(Kode, "Kode");
