import { HourglassBottomFilledIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading, Link } from "@navikt/ds-react";
import { useSanityData } from "./SanityDataProvider";

export default function OutdatedAlert() {
  const ctx = useSanityData();

  return (
    <div className="mb-12 flex gap-3 rounded-md bg-amber-50 p-4 ring-1 ring-amber-300">
      <div>
        <HourglassBottomFilledIcon aria-hidden fontSize="1.5rem" />
      </div>
      <div>
        <Heading level="2" size="small" className="mb-2">
          Innholdet kan være utdatert
        </Heading>
        <BodyLong className={ctx?.validUser ? "mb-4" : undefined}>
          Det er over 1 år siden innholdet ble revidert. Vi kan ikke være helt
          sikre på hvor nøyaktig artikkelen er lenger.
        </BodyLong>
        {ctx?.validUser && (
          <>
            <BodyLong className="mb-2 mt-2">
              <Link href="https://aksel.nav.no/side/skriv-for-aksel#a5b79ddd59da">
                Hvordan oppdaterer man innhold i Sanity?
              </Link>
            </BodyLong>
            <Button
              as="a"
              href={`https://aksel.nav.no/admin/prod/intent/edit/id=${ctx?.id}`}
              target="_blank"
              size="small"
              variant="secondary-neutral"
            >
              Har du lyst til å kontrollere innholdet nå?
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
