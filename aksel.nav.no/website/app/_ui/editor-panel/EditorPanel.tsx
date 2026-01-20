import {
  DownloadIcon,
  ExclamationmarkTriangleIcon,
  InformationSquareIcon,
  LightBulbIcon,
  LinkIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@navikt/aksel-icons";
import { InfoCard, Spacer } from "@navikt/ds-react";
import {
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import { AkselColor } from "@navikt/ds-react/types/theme";

type EditorPanelProps = {
  children: React.ReactNode;
  /**
   * Overrides default heading
   */
  heading?: string;
  /**
   * @default "h2"
   */
  headingTag?: "h2" | "h3" | "h4" | "div";
  /**
   * Optional action
   * @example <CopyButton />
   */
  actionComponent?: React.ReactNode;
  variant: "tips" | "do" | "dont" | "caution" | "info" | "links" | "attachment";
};

const VariantConfig: Record<
  EditorPanelProps["variant"],
  {
    heading: string;
    icon: React.ReactElement;
    color: AkselColor;
  }
> = {
  tips: {
    heading: "Tips",
    icon: <LightBulbIcon aria-hidden fontSize="1.5rem" />,
    color: "brand-blue",
  },
  do: {
    heading: "Gjør",
    icon: <ThumbUpIcon aria-hidden fontSize="1.5rem" />,
    color: "brand-blue",
  },
  dont: {
    heading: "Unngå",
    icon: <ThumbDownIcon aria-hidden fontSize="1.5rem" />,
    color: "danger",
  },
  caution: {
    heading: "Pass på",
    icon: <ExclamationmarkTriangleIcon aria-hidden fontSize="1.5rem" />,
    color: "warning",
  },
  info: {
    heading: "Info",
    icon: <InformationSquareIcon aria-hidden fontSize="1.5rem" />,
    color: "brand-blue",
  },
  links: {
    heading: "Lenker",
    icon: <LinkIcon aria-hidden fontSize="1.5rem" />,
    color: "neutral",
  },
  attachment: {
    heading: "Vedlegg",
    icon: <DownloadIcon aria-hidden fontSize="1.5rem" />,
    color: "neutral",
  },
} as const;

function EditorPanel(props: EditorPanelProps) {
  const { variant, children, heading, headingTag, actionComponent } = props;

  const config = VariantConfig[variant];

  return (
    <InfoCard
      data-block-margin="space-28"
      data-color={config.color}
      data-text-prose
    >
      <EditorPanelHeader
        variant={variant}
        heading={heading}
        headingTag={headingTag}
        actionComponent={actionComponent}
      />
      <InfoCardContent>{children}</InfoCardContent>
    </InfoCard>
  );
}

function EditorPanelHeader(
  props: Pick<
    EditorPanelProps,
    "variant" | "heading" | "headingTag" | "actionComponent"
  >,
) {
  const {
    variant,
    heading,
    headingTag = "h2",

    actionComponent,
  } = props;
  const config = VariantConfig[variant];

  return (
    <InfoCardHeader icon={config.icon}>
      <InfoCardTitle as={headingTag}>{heading ?? config.heading}</InfoCardTitle>
      {actionComponent && (
        <>
          <Spacer />
          {actionComponent}
        </>
      )}
    </InfoCardHeader>
  );
}

export { EditorPanel };
