import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";

export const Sandbox = ({ code }: { code: string }) => {
  return (
    <Button
      href={`/sandbox/index.html?code=${code}`}
      rel="noreferrer"
      target="_blank"
      as="a"
      variant="tertiary-neutral"
      size="small"
      icon={<PencilIcon aria-hidden fontSize="1.5rem" />}
    >
      Sandbox
    </Button>
  );
};
