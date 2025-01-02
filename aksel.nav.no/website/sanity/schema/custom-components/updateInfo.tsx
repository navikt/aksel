import { differenceInDays, differenceInMonths } from "date-fns";
import { ComponentType } from "react";
import { ObjectFieldProps, useFormValue } from "sanity";
import { HourglassBottomFilledIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading, Link } from "@navikt/ds-react";

export const UpdateInfo: ComponentType<ObjectFieldProps> = () => {
  const articleType = useFormValue(["_type"]);

  const verified: any = useFormValue(["updateInfo", "lastVerified"]);
  if (!verified) {
    return null;
  }
  const diff = differenceInMonths(new Date(), new Date(verified));
  const diffInDays = differenceInDays(new Date(), new Date(verified));
  const outDated = diff >= (articleType === "aksel_artikkel" ? 12 : 6);

  if (!outDated) {
    return null;
  }

  return (
    <div className="mt-4 rounded-md bg-surface-subtle p-4 dark:bg-gray-900">
      <div className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-300">
        <HourglassBottomFilledIcon
          aria-hidden
          fontSize="1rem"
          className="shrink-0"
        />
        <Heading level="3" size="small">
          Artikkelen er utdatert {`(${diffInDays} dager)`}
        </Heading>
      </div>
      <BodyLong>
        {`Artikkelen er utdatert og trenger ny godkjenning. Les gjennom og oppdater innholdet, for så å klikke på "Godkjenn innhold"-knapp. `}
        <Link href="https://aksel.nav.no/side/skriv-for-aksel#a5b79ddd59da">
          Les mer om hvorfor en artikkel regnes som utdatert.
        </Link>
      </BodyLong>
    </div>
  );
};
