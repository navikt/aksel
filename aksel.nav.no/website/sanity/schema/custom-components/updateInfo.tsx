import { Alert } from "@navikt/ds-react";
import { differenceInMonths } from "date-fns";
import { StringFieldProps, useFormValue } from "sanity";

export function UpdateInfo(props: StringFieldProps) {
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
    <Alert variant="warning">
      Artikkelen er over 6 mnd gammel og trenger ny godkjenning.
    </Alert>
  );
}
