import {
  HourglassBottomFilledIcon,
  SparklesIcon,
  TestFlaskIcon,
} from "@navikt/aksel-icons";
import { BodyLong, InfoCard } from "@navikt/ds-react";
import {
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import {
  SystemPanelAction,
  SystemPanelOutdatedAction,
} from "./SystemPanel.action";

type SystemPanelProps =
  | {
      variant: "outdated";
      /**
       * Sanity document id
       */
      docId: string;
    }
  | {
      variant: "beta" | "new";
      /**
       * @default false
       */
      unsafeBeta?: boolean;
      /**
       * Typically the component name
       */
      pageHeading?: string;
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
  const { variant } = props;

  const config = VariantConfig[variant];

  return (
    <InfoCard
      data-block-margin="space-28"
      data-color={config.colorRole}
      as="section"
      aria-label="Beta"
    >
      <SystemPanelHeader variant={variant} />

      <InfoCardContent>
        <BodyLong data-text-prose>
          {variant !== "outdated" && props.unsafeBeta
            ? unsafeDescription
            : config.description}
        </BodyLong>
        {variant === "outdated" ? (
          <SystemPanelOutdatedAction docId={props.docId} />
        ) : (
          <SystemPanelAction titleSuffix={props.pageHeading} />
        )}
      </InfoCardContent>
    </InfoCard>
  );
}

function SystemPanelHeader({ variant }: Pick<SystemPanelProps, "variant">) {
  const config = VariantConfig[variant];

  return (
    <InfoCardHeader icon={config.icon}>
      <InfoCardTitle>{config.heading}</InfoCardTitle>
    </InfoCardHeader>
  );
}

export { SystemPanel };
