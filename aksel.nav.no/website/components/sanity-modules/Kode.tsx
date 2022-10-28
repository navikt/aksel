import { Snippet } from "@/components";
import { withErrorBoundary } from "@/error-boundary";
import { SanityT } from "@/lib";

const Kode = ({ node }: { node: SanityT.Schema.kode }): JSX.Element => {
  if (!node || !node.code) {
    return null;
  }

  return <Snippet node={node} className="last:mb-0" />;
};

export default withErrorBoundary(Kode, "Kode");
