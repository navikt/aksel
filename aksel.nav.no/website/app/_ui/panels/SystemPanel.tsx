import {
  HourglassBottomFilledIcon,
  SparklesIcon,
  TestFlaskIcon,
} from "@navikt/aksel-icons";
import { BodyLong, Button, Heading } from "@navikt/ds-react";
import styles from "./SystemPanel.module.css";

type SystemPanelProps = {
  variant: "outdated" | "beta" | "new";
  /**
   * @default false
   */
  unsafeBeta?: boolean;
};

const VariantConfig = {
  outdated: {
    heading: "Innholdet kan være utdatert",
    description:
      "Det er over 1 år siden innholdet ble revidert. Vi kan ikke være helt sikre på hvor nøyaktig artikkelen er lenger.",
    icon: <HourglassBottomFilledIcon aria-hidden fontSize="1.5rem" />,
    action: OutdatedAction,
    colorRole: "neutral",
  },
  beta: {
    heading: "Beta",
    description:
      "Komponenten er under utvikling, men klar for adopsjon. Vi ønsker gjerne innspill på hvordan den fungerer og hvilke forbedringer vi kan gjøre.",
    icon: <TestFlaskIcon aria-hidden fontSize="1.5rem" />,
    action: () => (
      <div className={styles.systemPanelAction}>
        <Button
          size="small"
          variant="secondary-neutral"
          as="a"
          href="https://github.com/navikt/aksel/issues/new?labels=foresp%C3%B8rsel+%F0%9F%A5%B0%2Ckomponenter+%F0%9F%A7%A9%2Cbeta+%F0%9F%A7%AA&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+%3CActionMenu%20/%3E"
        >
          Send innspill
        </Button>
      </div>
    ),
    colorRole: "meta-purple",
  },
  new: {
    heading: "Ny funksjon",
    description:
      "Denne komponenten er ny eller oppdatert. Tar du den i bruk ønsker vi gjerne innspill til hvordan den fungerer i tjenesten din!",
    icon: <SparklesIcon aria-hidden fontSize="1.5rem" />,
    action: () => (
      <div className={styles.systemPanelAction}>
        <Button
          size="small"
          variant="secondary-neutral"
          as="a"
          href="https://github.com/navikt/aksel/issues/new?labels=foresp%C3%B8rsel+%F0%9F%A5%B0%2Ckomponenter+%F0%9F%A7%A9%2Cbeta+%F0%9F%A7%AA&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+%3CActionMenu%20/%3E"
        >
          Send innspill
        </Button>
      </div>
    ),
    colorRole: "success",
  },
} as const;

const unsafeDescription =
  "Komponenten er under utvikling. Så lenge komponenten er prefikset med UNSAFE kan det også medføre breaking-changes i minor versjon av kodepakker og i Figma. Teamet ditt må selv ta stilling til om dere ønsker å bruke denne i produksjon.";

function SystemPanel(props: SystemPanelProps) {
  const { variant, unsafeBeta = false } = props;

  const config = VariantConfig[variant];

  return (
    <div
      data-block-margin="space-28"
      className={styles.systemPanel}
      data-color-role={config.colorRole}
    >
      <div className={styles.systemPanelContent}>
        <SystemPanelHeader variant={variant} />
        <BodyLong data-text-prose>
          {unsafeBeta ? unsafeDescription : config.description}
        </BodyLong>
        {config.action()}
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

/**
 * TODO: Implement shortcut to update the article in Sanity
 * - Need to have new presentation setup working
 * - Need to have a way to get the user sanity login state
 */
function OutdatedAction() {
  /* <Link href="https://aksel.nav.no/side/skriv-for-aksel#a5b79ddd59da">
      Hvordan oppdaterer man innhold i Sanity?
    </Link> */
  return <></>;
}

export { SystemPanel };
