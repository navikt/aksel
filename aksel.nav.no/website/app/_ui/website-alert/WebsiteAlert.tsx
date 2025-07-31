import { PortableTextBlock, stegaClean } from "next-sanity";
import { Alert, Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";

function WebsiteAlert(props: ExtractPortableComponentProps<"alert">) {
  const { body, variant, heading, heading_level } = props.value;

  if (!variant || !body || body.length === 0) {
    return null;
  }

  return (
    <Alert variant={variant} data-block-margin="space-28">
      {heading && (
        <Heading
          spacing
          size="small"
          as={stegaClean(heading_level) ?? "h2"}
          id={`${encodeURIComponent(heading)}-a`}
          className="scroll-m-20"
        >
          {heading}
        </Heading>
      )}
      <CustomPortableText value={body as PortableTextBlock[]} />
    </Alert>
  );
}

export { WebsiteAlert };
