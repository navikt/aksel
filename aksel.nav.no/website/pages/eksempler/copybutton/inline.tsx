import { CopyButton } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex items-center gap-2">
      <CopyButton size="small" copyText="Maguer Gorge 14b, 56430 Tatooine" />{" "}
      Adresse: Maguer Gorge 14b, 56430 Tatooine
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
  desc: "CopyButton kan settes inline med tekst for å forenkle repetive oppgaver.",
};
