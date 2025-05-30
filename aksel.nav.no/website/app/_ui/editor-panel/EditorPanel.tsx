import {
  DownloadIcon,
  ExclamationmarkTriangleIcon,
  FileTextIcon,
  InformationSquareIcon,
  LightBulbIcon,
  LinkIcon,
  ThumbDownIcon,
  ThumbUpIcon,
} from "@navikt/aksel-icons";
import { Heading, Spacer } from "@navikt/ds-react";
import { GlobalColorRoles } from "@navikt/ds-tokens/types";
import { AkselBrandColors } from "@/app/theme";
import styles from "./EditorPanel.module.css";

type EditorPanelProps = {
  children: React.ReactNode;
  /**
   * Overrides default heading
   */
  heading?: string;
  /**
   * @default "h2"
   */
  headingTag?: "h2" | "h3" | "h4" | "p";
  /**
   * Optional action
   * @example <CopyButton />
   */
  actionComponent?: React.ReactNode;
  variant:
    | "tips"
    | "do"
    | "dont"
    | "caution"
    | "info"
    | "links"
    | "attachment"
    | "example-text";
};

const VariantConfig: Record<
  EditorPanelProps["variant"],
  {
    heading: string;
    icon: JSX.Element;
    colorRole: GlobalColorRoles | AkselBrandColors;
  }
> = {
  tips: {
    heading: "Tips",
    icon: <LightBulbIcon aria-hidden fontSize="1.5rem" />,
    colorRole: "brand-blue",
  },
  do: {
    heading: "Gjør",
    icon: <ThumbUpIcon aria-hidden fontSize="1.5rem" />,
    colorRole: "brand-blue",
  },
  dont: {
    heading: "Unngå",
    icon: <ThumbDownIcon aria-hidden fontSize="1.5rem" />,
    colorRole: "danger",
  },
  caution: {
    heading: "Pass på",
    icon: <ExclamationmarkTriangleIcon aria-hidden fontSize="1.5rem" />,
    colorRole: "warning",
  },
  info: {
    heading: "Info",
    icon: <InformationSquareIcon aria-hidden fontSize="1.5rem" />,
    colorRole: "brand-blue",
  },
  links: {
    heading: "Lenker",
    icon: <LinkIcon aria-hidden fontSize="1.5rem" />,
    colorRole: "neutral",
  },
  attachment: {
    heading: "Vedlegg",
    icon: <DownloadIcon aria-hidden fontSize="1.5rem" />,
    colorRole: "neutral",
  },
  "example-text": {
    heading: "Eksempeltekst",
    icon: <FileTextIcon aria-hidden fontSize="1.5rem" />,
    colorRole: "neutral",
  },
} as const;

function EditorPanel(props: EditorPanelProps) {
  const { variant, children, heading, headingTag, actionComponent } = props;

  const config = VariantConfig[variant];

  return (
    <div
      data-block-margin="space-28"
      className={styles.editorPanel}
      data-color-role={config.colorRole}
    >
      <EditorPanelHeader
        variant={variant}
        heading={heading}
        headingTag={headingTag}
        actionComponent={actionComponent}
      />
      <div data-text-prose className={styles.editorPanelContent}>
        {children}
      </div>
    </div>
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
    <div className={styles.editorPanelHeader} data-variant={variant}>
      {config.icon}
      <Heading as={headingTag} size="small">
        {heading ?? config.heading}
      </Heading>
      {actionComponent && (
        <>
          <Spacer />
          {actionComponent}
        </>
      )}
    </div>
  );
}

export { EditorPanel };
