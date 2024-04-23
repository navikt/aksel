import { PencilIcon } from "@navikt/aksel-icons";
import { Button, Hide, Show } from "@navikt/ds-react";

export const Sandbox = ({ code }: { code: string }) => {
  return (
    <>
      <Show above="lg" asChild>
        <Button
          href={`/sandbox/index.html?code=${code}`}
          rel="noreferrer"
          target="_blank"
          as="a"
          variant="tertiary-neutral"
          size="small"
          icon={<PencilIcon aria-hidden />}
        >
          Sandbox
        </Button>
      </Show>
      <Hide above="lg" asChild>
        <Button
          href={`/sandbox/index.html?code=${code}`}
          rel="noreferrer"
          target="_blank"
          as="a"
          variant="tertiary-neutral"
          size="small"
          icon={<PencilIcon title="Sandbox" />}
        />
      </Hide>
    </>
  );
};
