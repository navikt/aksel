import { Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <form role="search">
      <Search label="Søk alle NAV sine sider" variant="secondary" />
    </form>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
  desc: "Hvis du er i tvil om hvilken variant du skal bruke, er det sikkert denne som er riktig.",
};
