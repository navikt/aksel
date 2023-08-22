import { BodyLong, Label } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Label spacing as="p">
        Oppgi årsaken til at du har ventet mer enn 6 måneder med å søke om
        refusjon
      </Label>
      <BodyLong>
        Hvis du ikke bor sammen med begge foreldrene dine, kan du ha rett til
        barnebidrag fra en eller begge foreldre mens du fullfører videregående
        skole eller tilsvarende.
      </BodyLong>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
