import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useMedia } from "@/hooks/useMedia";

export const Sandbox = ({ code }: { code: string }) => {
  const showLabel = useMedia("(min-width: 1024px)");

  return (
    <Button
      href={`/sandbox/index.html?code=${code}`}
      rel="noreferrer"
      target="_blank"
      as="a"
      variant="tertiary-neutral"
      size="small"
      icon={
        <PencilIcon aria-hidden={showLabel} title={!showLabel && "Sandbox"} />
      }
    >
      {showLabel && "Sandbox"}
    </Button>
  );
};
