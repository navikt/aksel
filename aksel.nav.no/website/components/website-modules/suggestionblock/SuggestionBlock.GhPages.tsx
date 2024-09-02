import { HandShakeHeartIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading } from "@navikt/ds-react";

export const SuggestionBlockGhPages = ({
  reference,
}: {
  reference: string;
}) => {
  return (
    <div className="mb-12 flex gap-2 rounded-lg bg-pink-100 px-6 py-4 ring-1 ring-inset ring-pink-300">
      <span className="-mt-[1px] grid h-7 shrink-0 place-content-center text-2xl">
        <HandShakeHeartIcon aria-hidden />
      </span>
      <div>
        <Heading size="small" level="2">
          Samarbeid
        </Heading>
        <BodyLong className="mt-2">
          Retningslinjene er klare til bruk. Når du har fått prøvd dem og høstet
          erfaringer ønsker vi å lære av din innsikt. Delta i diskusjonen og bli
          med på å forbedre retningslinjene.
        </BodyLong>
        <Button
          variant="secondary-neutral"
          as="a"
          href={reference}
          className="mt-4"
          target="_blank"
          rel="noreferrer noopener"
          size="small"
        >
          Delta i diskusjonen
        </Button>
      </div>
    </div>
  );
};
