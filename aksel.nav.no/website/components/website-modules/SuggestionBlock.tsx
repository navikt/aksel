import { LightBulb } from "@navikt/ds-icons";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { RobotIcon } from "@sanity/icons";
import cl from "classnames";
import { ChangelogIcon } from "components/assets";

const SuggestionBlockComponent = ({
  variant,
  reference = "",
}: {
  variant: "komponent-beta" | "komponent-ny";
  reference?: string;
}) => {
  return (
    <div
      className={cl("mb-12 flex gap-3 rounded-lg px-6 py-4 ring-1 ring-inset", {
        "bg-surface-info-subtle ring-border-subtle": variant === "komponent-ny",
        "bg-violet-50 ring-violet-300": variant === "komponent-beta",
      })}
    >
      <span className="shrink-0 text-2xl">{options[variant]?.icon}</span>
      <div className="grid">
        <Heading size="small" level="2">
          {options[variant]?.heading}
        </Heading>
        <BodyLong className="mt-2">{options[variant]?.text}</BodyLong>
        <a
          href={options[variant].link + reference}
          className="border-border-strong active:bg-surface-active hover:bg-surface-hover focus-visible:shadow-focus mt-4 w-fit rounded border-[2px] px-3 py-[6px] font-semibold focus:outline-none"
        >
          Send innspill
        </a>
      </div>
    </div>
  );
};

export const SuggestionBlock = ({
  variant,
  reference = "",
}: {
  variant:
    | "ikoner"
    | "komponenter"
    | "komponent"
    | "komponent-ny"
    | "komponent-beta"
    | "ikon-ny"
    | "ikon";
  reference?: string;
}) => {
  if (variant === "komponent-ny" || variant === "komponent-beta") {
    return <SuggestionBlockComponent variant={variant} />;
  }

  return (
    <div
      className={cl(
        "ring-border-subtle flex justify-between rounded-lg px-6 py-4 ring-1",
        {
          "mb-0 mt-5": variant === "ikon" || variant === "ikon-ny",
          "mb-12": variant !== "ikon" && variant !== "ikon-ny",
          "bg-surface-info-subtle": variant === "ikon-ny",
        }
      )}
    >
      <BodyShort className="flex items-center gap-2">
        <LightBulb aria-hidden className="shrink-0 text-2xl" />
        {options[variant]?.text}
      </BodyShort>
      <a
        href={options[variant]?.link + reference}
        className="border-border-strong active:bg-surface-active hover:bg-surface-hover focus-visible:shadow-focus rounded border-[2px] px-3 py-[6px] font-semibold focus:outline-none"
      >
        Send forslag
      </a>
    </div>
  );
};

const issueUrl =
  "https://github.com/navikt/Designsystemet/issues/new?assignees=olejorgenbakken";

const options: {
  [key: string]: {
    text: string;
    link: string;
    heading?: string;
    icon?: React.ReactNode;
  };
} = {
  ikoner: {
    text: "Har du forslag til nye ikoner, eller endringer?",
    link:
      issueUrl +
      "&labels=nytt+✨%2Cikoner+🖼%2Cforespørsel+🥰&template&template=new-icon.yaml&title=%5BNytt+ikon%5D%3A+",
  },
  komponenter: {
    text: "Har du forslag til nye komponenter, eller endringer?",
    link:
      issueUrl +
      "&labels=nytt+✨%2Cforespørsel+🥰%2Ckomponenter+🧩&template=new-component.yml&title=%5BNy+komponent%5D%3A+",
  },
  komponent: {
    text: "Har du innspill til komponenten?",
    link: `${issueUrl}&labels=forespørsel+🥰%2Ckomponenter+🧩&template=update-component.yml&title=%5BInnspill+til+komponent%5D%3A+`,
  },
  ikon: {
    text: "Har du innspill til ikonet?",
    link:
      issueUrl +
      "&labels=forespørsel+🥰&template=update-icon.yml&title=%5BInnspill+til+ikon%5D%3A+",
  },
  "ikon-ny": { text: "Har du innspill til ikonet?", link: "" },
  "komponent-ny": {
    text: "Denne komponenten er helt ny i biblioteket. Tar du den i bruk ønsker vi gjerne innspill til hvordan den fungerer i tjenesten din!",
    heading: "Ny",
    link: "",
    icon: <ChangelogIcon aria-hidden />,
  },
  "komponent-beta": {
    text: "Komponenten er under utvikling. Dette kan medføre bugs slik at teamet ditt må ta stilling til om dere ønsker å bruke denne i produksjon. Hvis komponenten er prefikset med UNSAFE kan det også medføre breaking-changes i patch/minor versjon av kodepakker og i Figma. Tar du den i bruk ønsker vi gjerne innspill til hvordan den fungerer i tjenesten din!",
    heading: "Beta",
    link: "",
    icon: <RobotIcon aria-hidden />,
  },
};
