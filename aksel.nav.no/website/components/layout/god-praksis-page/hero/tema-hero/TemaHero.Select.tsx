import { forwardRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { BodyShort } from "@navikt/ds-react";

type TemaSelectButtonProps = {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  expanded: boolean;
  hidden?: boolean;
};

export const TemaSelectButton = forwardRef<
  HTMLButtonElement,
  TemaSelectButtonProps
>(({ onClick, expanded, hidden }: TemaSelectButtonProps, ref) => {
  return (
    <BodyShort
      size="large"
      as="button"
      className="relative z-10 flex items-center gap-05 rounded-full bg-surface-subtle py-1 pl-4 pr-2 shadow-xsmall focus:outline-none focus-visible:shadow-focus"
      onClick={onClick}
      aria-expanded={expanded}
      ref={ref}
      aria-hidden={hidden}
    >
      Tema
      <ChevronDownIcon aria-hidden className="shrink-0 text-2xl" />
    </BodyShort>
  );
});