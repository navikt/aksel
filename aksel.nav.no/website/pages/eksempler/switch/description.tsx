import { Switch } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Switch description="Velg det landet du tilbringer mest tid.">
      Slå på notifikasjoner
    </Switch>
  );
};

export default withDsExample(Example);

export const args = {
  index: 2,
};
