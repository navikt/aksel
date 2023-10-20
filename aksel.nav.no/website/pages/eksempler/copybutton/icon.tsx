import { LinkIcon } from "@navikt/aksel-icons";
import { CopyButton } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <CopyButton
      copyText="https://aksel.nav.no/"
      text="Kopier lenke"
      activeText="Lenken er kopiert"
      icon={<LinkIcon aria-hidden />}
    />
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Icon-propen lar deg bytte ikon i default state",
};
