import { ReadMore } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <ReadMore size="small" header="Dette regnes som helsemessige begrensninger">
      Med helsemessige begrensninger mener vi funksjonshemming, sykdom,
      allergier som hindrer deg i arbeidet eller andre årsaker som må tas hensyn
      til når du skal finne nytt arbeid. Du må oppgi hva som gjelder for deg, og
      dokumentere de helsemessige årsakene du viser til.
    </ReadMore>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
