import { HourglassBottomFilledIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading } from "@navikt/ds-react";
import { useSanityData } from "@/hooks/useSanityData";

export default function OutdatedAlert() {
  const { id, validUser } = useSanityData();

  return (
    <div className="flex gap-3 p-4 rounded-md ring-1 bg-amber-50 ring-amber-300 mb-12">
      <div>
        <HourglassBottomFilledIcon aria-hidden fontSize="1.5rem" />
      </div>
      <div>
        <Heading level="2" size="small" className="mb-2">
          Innholdet kan være utdatert
        </Heading>
        <BodyLong className={validUser ? "mb-4" : undefined}>
          Det er over 1 år siden innholdet ble endret. Vi kan ikke være helt
          sikre på hvor nøyaktig artikkelen er lenger.
        </BodyLong>
        {validUser && (
          <>
            <BodyLong className="mb-2">
              Du ser også dette fordi du kan redigere denne artikkelen. Har du
              lyst til å kontrollere innholdet nå?
            </BodyLong>
            <Button
              as="a"
              href={`https://aksel.nav.no/admin/prod/intent/edit/id=${id}`}
              target="_blank"
              size="small"
              variant="secondary-neutral"
            >
              Kontroller innholdet
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
