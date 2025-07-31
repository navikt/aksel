import {
  HourglassBottomFilledIcon,
  SparklesIcon,
  TestFlaskIcon,
} from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import {
  SystemPanelAction,
  SystemPanelOutdatedAction,
} from "./SystemPanel.action";
import styles from "./SystemPanel.module.css";

type SystemPanelProps = {
  variant: "outdated" | "beta" | "new";
  /**
   * @default false
   */
  unsafeBeta?: boolean;
  /**
   * Sanity document id
   */
  docId?: string;
};

const VariantConfig = {
  outdated: {
    heading: "Innholdet kan være utdatert",
    description:
      "Det er over 1 år siden innholdet ble revidert. Vi kan ikke være helt sikre på hvor nøyaktig artikkelen er lenger.",
    icon: <HourglassBottomFilledIcon aria-hidden fontSize="1.5rem" />,
    colorRole: "neutral",
  },
  beta: {
    heading: "Beta",
    description:
      "Komponenten er under utvikling, men klar for adopsjon. Vi ønsker gjerne innspill på hvordan den fungerer og hvilke forbedringer vi kan gjøre.",
    icon: <TestFlaskIcon aria-hidden fontSize="1.5rem" />,

    colorRole: "meta-purple",
  },
  new: {
    heading: "Ny funksjon",
    description:
      "Denne komponenten er ny eller oppdatert. Tar du den i bruk ønsker vi gjerne innspill til hvordan den fungerer i tjenesten din!",
    icon: <SparklesIcon aria-hidden fontSize="1.5rem" />,

    colorRole: "success",
  },
} as const;

const unsafeDescription =
  "Komponenten er under utvikling. Så lenge komponenten er prefikset med UNSAFE kan det også medføre breaking-changes i minor versjon av kodepakker og i Figma. Teamet ditt må selv ta stilling til om dere ønsker å bruke denne i produksjon.";

function SystemPanel(props: SystemPanelProps) {
  const { variant, docId, unsafeBeta = false } = props;

  const config = VariantConfig[variant];

  return (
    <div
      data-block-margin="space-28"
      className={styles.systemPanel}
      data-color={config.colorRole}
    >
      <div className={styles.systemPanelContent}>
        <SystemPanelHeader variant={variant} />
        <BodyLong data-text-prose>
          {unsafeBeta ? unsafeDescription : config.description}
        </BodyLong>
        {variant === "outdated" ? (
          <SystemPanelOutdatedAction docId={docId} />
        ) : (
          <SystemPanelAction />
        )}
      </div>
    </div>
  );
}

function SystemPanelHeader({ variant }: Pick<SystemPanelProps, "variant">) {
  const config = VariantConfig[variant];

  return (
    <div className={styles.systemPanelHeader} data-variant={variant}>
      {config.icon}
      <Heading level="2" size="small">
        {config.heading}
      </Heading>
    </div>
  );
}

export { SystemPanel };
