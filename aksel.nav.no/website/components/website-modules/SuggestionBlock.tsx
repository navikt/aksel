import { LightBulb } from "@navikt/ds-icons";
import { BodyShort } from "@navikt/ds-react";

export const SuggestionBlock = ({
  variant,
}: {
  variant: "ikoner" | "komponenter" | "grunnleggende";
}) => {
  let text = "";
  switch (variant) {
    case "ikoner":
      text = "Har du forslag til nye ikoner, eller endringer?";
      break;
    case "komponenter":
      text = "Har du forslag til nye ikoner, eller endringer?";
      break;
    case "grunnleggende":
      text = "Har du forslag til nye ikoner, eller endringer?";
      break;
    default:
      return null;
  }

  return (
    <div className="ring-border-subtle mb-12 flex justify-between rounded-lg px-6 py-4 ring-1">
      <BodyShort as="span" className="flex items-center gap-2">
        <LightBulb aria-hidden className="text-2xl" />
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
