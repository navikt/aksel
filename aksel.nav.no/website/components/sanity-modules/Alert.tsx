import { ErrorBoundary } from "@/error-boundary";
import { SanityBlockContent } from "@/sanity-block";
import { AlertT } from "@/types";
import { Alert as DsAlert, Heading } from "@navikt/ds-react";

type AlertProps = {
  node: AlertT;
};

const Alert = ({ node }: AlertProps) => {
  return (
    <div className="mb-7 max-w-2xl">
      <DsAlert variant={node.variant}>
        {node.heading && (
          <Heading
            spacing
            size="small"
            as={node.heading_level}
            id={`${encodeURIComponent(node.heading)}-a`}
            className="scroll-m-20"
          >
            {node.heading}
          </Heading>
        )}
        <SanityBlockContent blocks={node.body} />
      </DsAlert>
    </div>
  );
};

export default function Component(props: AlertProps) {
  return (
    <ErrorBoundary boundaryName="Alert">
      <Alert {...props} />
    </ErrorBoundary>
  );
}
