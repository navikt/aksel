import { PortableTextBlock, stegaClean } from "next-sanity";
import { InformationSquareIcon } from "@navikt/aksel-icons";
import { Alert } from "@navikt/ds-react";
import {
  InfoCard,
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import {
  LocalAlert,
  LocalAlertContent,
  LocalAlertHeader,
  LocalAlertTitle,
} from "@navikt/ds-react/LocalAlert";
import { CustomPortableText } from "@/app/CustomPortableText";
import { ExtractPortableComponentProps } from "@/app/_sanity/types";

function WebsiteAlert(props: ExtractPortableComponentProps<"alert">) {
  const { body, variant, heading, heading_level } = props.value;

  if (!variant || !body || body.length === 0) {
    return null;
  }

  if (!heading) {
    return (
      <Alert variant={variant} data-block-margin="space-28">
        <CustomPortableText value={body as PortableTextBlock[]} />
      </Alert>
    );
  }

  if (variant === "info") {
    return (
      <InfoCard data-color="info" data-block-margin="space-28">
        <InfoCardHeader icon={<InformationSquareIcon aria-hidden />}>
          <InfoCardTitle
            as={stegaClean(heading_level) ?? "h2"}
            id={`${encodeURIComponent(heading)}-a`}
            className="scroll-m-20"
          >
            {heading}
          </InfoCardTitle>
        </InfoCardHeader>
        <InfoCardContent>
          <CustomPortableText value={body as PortableTextBlock[]} />
        </InfoCardContent>
      </InfoCard>
    );
  }

  return (
    <LocalAlert status={variant} data-block-margin="space-28">
      <LocalAlertHeader>
        <LocalAlertTitle
          as={stegaClean(heading_level) ?? "h2"}
          id={`${encodeURIComponent(heading)}-a`}
          className="scroll-m-20"
        >
          {heading}
        </LocalAlertTitle>
      </LocalAlertHeader>
      <LocalAlertContent>
        <CustomPortableText value={body as PortableTextBlock[]} />
      </LocalAlertContent>
    </LocalAlert>
  );
}

export { WebsiteAlert };
