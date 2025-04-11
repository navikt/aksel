import cl from "clsx";
import { forwardRef } from "react";
import { ChevronDownUpIcon, ChevronUpDownIcon } from "@navikt/aksel-icons";
import { BodyShort } from "@navikt/ds-react";

type HeroSelectButtonProps = {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  expanded: boolean;
  hidden?: boolean;
};

export const HeroSelectButton = forwardRef<
  HTMLButtonElement,
  HeroSelectButtonProps
>(({ onClick, expanded, hidden }: HeroSelectButtonProps, ref) => {
  return (
    <BodyShort
      size="large"
      as="button"
      className={cl(
        "relative z-10 flex items-center gap-05 rounded-full py-1 pl-4 pr-2 shadow-xsmall focus:outline-none focus-visible:shadow-focus",
        {
          "bg-teal-800 text-text-on-inverted focus-visible:shadow-focus-gap":
            expanded,
          "bg-teal-50 text-text-default": !expanded,
        },
      )}
      onClick={onClick}
      aria-expanded={expanded}
      ref={ref}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      Tema
      {expanded ? (
        <ChevronDownUpIcon aria-hidden className="shrink-0 text-2xl" />
      ) : (
        <ChevronUpDownIcon aria-hidden className="shrink-0 text-2xl" />
      )}
    </BodyShort>
  );
});
