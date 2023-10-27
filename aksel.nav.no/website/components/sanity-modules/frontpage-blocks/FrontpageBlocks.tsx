import { ErrorBoundary } from "@/error-boundary";
import Latest, { LatestT } from "./Latest";
export type BlocksT = LatestT;

type FrontpageBlockProps = {
  blocks: BlocksT[];
};

export const FrontpageBlock = ({ blocks }: FrontpageBlockProps) => {
  if (!blocks || !blocks.length) {
    return null;
  }
  return (
    <div className="lg:px-18 px-2">
      {blocks.map((x) => {
        switch (x._type) {
          case "nytt_fra_aksel":
            return <Latest block={x} key={x._key} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default function Component(props: FrontpageBlockProps) {
  return (
    <ErrorBoundary boundaryName="FrontpageBlock">
      <FrontpageBlock {...props} />
    </ErrorBoundary>
  );
}
