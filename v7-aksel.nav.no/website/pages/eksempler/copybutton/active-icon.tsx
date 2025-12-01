import { LinkIcon, ThumbUpIcon } from "@navikt/aksel-icons";
import { CopyButton } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <CopyButton
      copyText="https://aksel.nav.no/"
      text="Kopier lenke"
      activeText="Lenken er kopiert"
      icon={<LinkIcon aria-hidden />}
      activeIcon={<ThumbUpIcon aria-hidden />}
    />
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 6,
  desc: "`activeIcon`-propen lar deg endre ikon i aktivert tilstand.",
};
