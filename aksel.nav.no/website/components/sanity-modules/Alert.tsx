import { Alert as DsAlert, Heading } from "@navikt/ds-react";
import React from "react";
import { SanityBlockContent } from "@/sanity-block";
import { AlertT } from "@/types";

const Alert = ({ node }: { node: AlertT }) => {
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
        <SanityBlockContent blocks={node.body} noLastMargin />
      </DsAlert>
    </div>
  );
};

export default Alert;
