import { Alert as DsAlert, Heading } from "@navikt/ds-react";
import React from "react";
import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";

const Alert = ({
  node,
}: {
  node: SanityT.Schema.alert & { _key: string };
}): JSX.Element => {
  return (
    <div className="mb-7 max-w-2xl">
      <DsAlert variant={node.variant}>
        {node.heading && (
          <Heading spacing size="small" as={node.heading_level} id={node._key}>
            {node.heading}
          </Heading>
        )}
        <SanityBlockContent blocks={node.body} noLastMargin />
      </DsAlert>
    </div>
  );
};

export default Alert;
