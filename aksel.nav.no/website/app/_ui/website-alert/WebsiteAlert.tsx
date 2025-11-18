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

  /**
   * We remove the `role` prop since none of the "Alerts" are actually
   * meant to be assertive live regions.
   */
  return (
    <LocalAlert
      status={variant}
      data-block-margin="space-28"
      role={undefined}
      /**
       * TODO: Multiple alerts with same status leads to repeated landmark labels in Axe.
       * - Add more modules in Sanity for displaying positive/negative content: Do/Dont for content etc
       * - Migrate most of the current Alert-usages to these new modules
       * - Remove ignore when above is done
       * @see /god-praksis/artikler/vurder-behovet-for-ki for page where multiple alerts are used.
       */
      data-axe-ignore
    >
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
