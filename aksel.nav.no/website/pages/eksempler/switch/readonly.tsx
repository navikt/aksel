import { withDsExample } from "@/web/examples/withDsExample";
import { Switch } from "@navikt/ds-react";

const Example = () => {
  return (
    <div className="grid gap-4">
      <Switch readOnly>Slå på notifikasjoner</Switch>
      <Switch readOnly checked>
        Slå på notifikasjoner
      </Switch>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 98,
};
