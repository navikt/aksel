import { Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <search>
      <Search label="Søk i alle Nav sine sider" variant="secondary" />
    </search>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 0,
  desc: "Hvis du er i tvil om hvilken variant du skal bruke, er det sikkert denne som er riktig.",
};
