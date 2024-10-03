import ErrorBoundary from "@/error-boundary";
import { PropTableT } from "@/types";
import PropTableV2 from "./parts/PropTabell";

type PropsSeksjonProps = {
  node: any;
};

const PropsSeksjon = ({ node }: PropsSeksjonProps) => {
  if (
    !node ||
    (node?.elementer?.length === 0 && node?.komponenter?.length === 0)
  ) {
    return null;
  }

  return (
    <div className="mb-16">
      {node?.komponenter?.length > 0 &&
        node.komponenter.map((prop) => (
          <PropTableV2
            komponent={prop as unknown as PropTableT}
            key={prop?._key}
          />
        ))}
    </div>
  );
};

export default function Component(props: PropsSeksjonProps) {
  return (
    <ErrorBoundary boundaryName="PropsSeksjon">
      <PropsSeksjon {...props} />
    </ErrorBoundary>
  );
}
