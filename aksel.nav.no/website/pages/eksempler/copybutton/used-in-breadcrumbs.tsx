import { CopyButton } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <div className="flex items-center gap-1">
      <span>Flere statsborgerskap: Norge, Danmark, Finland</span>
      <span>/</span>
      <span className="flex items-center gap-1">
        17029645183 <CopyButton size="small" copyText="17029645183" />
      </span>
      <span>/</span>
      <span>Gift</span>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
  desc: "CopyButton kan eksempelvis inlines i breadcrumbs for kopi av fødselsnummer.",
};
