import { MagnifyingGlassIcon } from "@navikt/aksel-icons";
import { Button, Hide, Show } from "@navikt/ds-react";

type AkselSearchButtonProps = {
  onClick?: () => void;
};

export function AkselSearchButton({ onClick }: AkselSearchButtonProps) {
  return (
    <>
      <Show above="xl" asChild>
        <Button
          variant="primary"
          className="h-11 whitespace-nowrap bg-deepblue-600 hover:bg-deepblue-700"
          aria-keyshortcuts="Control+b"
          icon={
            <MagnifyingGlassIcon
              className="pointer-events-none -mt-[1px] shrink-0 text-2xl"
              aria-label="Åpne søk"
              aria-hidden
            />
          }
          iconPosition="left"
          onClick={onClick}
        >
          Søk <span className="text-medium font-normal">(ctrl + b)</span>
        </Button>
      </Show>
      <Hide above="xl" asChild>
        <Button
          variant="primary"
          className="h-11 bg-deepblue-600 hover:bg-deepblue-700"
          aria-keyshortcuts="Control+b"
          icon={
            <MagnifyingGlassIcon
              className="pointer-events-none -mt-[1px] shrink-0 text-2xl"
              aria-label="Åpne søk"
            />
          }
          iconPosition="left"
          onClick={onClick}
        />
      </Hide>
    </>
  );
}
