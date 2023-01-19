import { LightBulb } from "@navikt/ds-icons";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { RobotIcon } from "@sanity/icons";
import cl from "classnames";
import { ChangelogIcon } from "components/assets";

const SuggestionBlockComponent = ({
  variant,
}: {
  variant: "komponent-beta" | "komponent-ny";
}) => {
  let text = "";
  let heading = "";
  switch (variant) {
    case "komponent-ny":
      text =
        "Denne komponenten er helt ny i biblioteket. Tar du den i bruk ønsker vi gjerne innspill til hvordan den fungerer i tjenesten din!";
      heading = "Ny";
      break;
    case "komponent-beta":
      text =
        "Komponenten er under utvikling. Dette kan medføre bugs slik at teamet ditt må ta stilling til om dere ønsker å bruke denne i produksjon. Hvis komponenten er prefikset med UNSAFE kan det også medføre breaking-changes i patch/minor versjon av kodepakker og i Figma. Tar du den i bruk ønsker vi gjerne innspill til hvordan den fungerer i tjenesten din!";
      heading = "Beta";
      break;
    default:
      return null;
  }

  return (
    <div
      className={cl("mb-12 flex gap-3 rounded-lg px-6 py-4 ring-1 ring-inset", {
        "bg-surface-info-subtle ring-border-subtle": variant === "komponent-ny",
        "bg-violet-50 ring-violet-300": variant === "komponent-beta",
      })}
    >
      <span className="shrink-0 text-2xl">
        {variant === "komponent-beta" ? (
          <RobotIcon aria-hidden />
        ) : (
          <ChangelogIcon />
        )}
      </span>
      <div className="grid">
        <Heading size="small" level="2">
          {heading}
        </Heading>
        <BodyLong className="mt-2">{text}</BodyLong>
        <a
          href="#"
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
}: {
  variant:
    | "ikoner"
    | "komponenter"
    | "komponent"
    | "komponent-ny"
    | "komponent-beta"
    | "grunnleggende"
    | "ikon-ny"
    | "ikon";
}) => {
  if (variant === "komponent-ny" || variant === "komponent-beta") {
    return <SuggestionBlockComponent variant={variant} />;
  }
  let text = "";
  switch (variant) {
    case "ikoner":
      text = "Har du forslag til nye ikoner, eller endringer?";
      break;
    case "ikon":
      text = "Har du innspill til ikonet?";
      break;
    case "ikon-ny":
      text = "Har du innspill til ikonet?";
      break;
    case "komponenter":
      text = "Har du forslag til nye komponenter, eller endringer?";
      break;
    case "komponent":
      text = "Har du innspill til komponenten?";
      break;
    /* case "grunnleggende":
      text = "Har du forslag til grunnleggende, eller endringer?";
      break; */
    default:
      return null;
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
        {text}
      </BodyShort>
      <a
        href="#"
        className="border-border-strong active:bg-surface-active hover:bg-surface-hover focus-visible:shadow-focus rounded border-[2px] px-3 py-[6px] font-semibold focus:outline-none"
      >
        Send forslag
      </a>
    </div>
  );
};
