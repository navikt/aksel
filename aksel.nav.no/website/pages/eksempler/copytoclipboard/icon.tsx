import { LinkIcon } from "@navikt/aksel-icons";
import { CopyToClipboard } from "@navikt/ds-react-internal";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <CopyToClipboard
      icon={<LinkIcon title="kopier lenke" />}
      copyText="#lenke"
      popoverText="Kopierte lenke"
    />
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
