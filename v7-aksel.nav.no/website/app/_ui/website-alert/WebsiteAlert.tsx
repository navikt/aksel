import { PortableTextBlock, stegaClean } from "next-sanity";
import {
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  InformationSquareIcon,
  XMarkOctagonIcon,
} from "@navikt/aksel-icons";
import { Alert } from "@navikt/ds-react";
import {
  InfoCard,
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
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

  return (
    <InfoCard
      data-color={variant === "error" ? "danger" : variant}
      data-block-margin="space-28"
    >
      <InfoCardHeader icon={<StatusIcon status={variant} />}>
        <InfoCardTitle
          as={stegaClean(heading_level) ?? "h2"}
          id={`${encodeURIComponent(heading)}-a`}
          data-scroll-margin
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

const STATUS_ICONS = {
  info: InformationSquareIcon,
  success: CheckmarkCircleIcon,
  warning: ExclamationmarkTriangleIcon,
  error: XMarkOctagonIcon,
} as const;

function StatusIcon({ status }: { status: keyof typeof STATUS_ICONS }) {
  const Icon = STATUS_ICONS[status];
  return <Icon aria-hidden />;
}

export { WebsiteAlert };
