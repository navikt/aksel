import { Alert } from "@navikt/ds-react";
import { differenceInMonths } from "date-fns";
import { useFormValue } from "sanity";

export function UpdateInfo() {
  const verified: any = useFormValue(["updateInfo", "lastVerified"]);
  if (!verified) {
    return null;
  }
  const diff = differenceInMonths(new Date(), new Date(verified));
  const outDated = diff >= 6;
  if (!outDated) {
    return null;
  }

  return (
    <Alert variant="warning" data-theme="light">
      Artikkelen er over 6 mnd gammel og trenger ny godkjenning!
      <div className="mt-4">
        Sist oppdatert: {verified.split("-").reverse().join(".")}
      </div>
    </Alert>
  );
}
