import { GlobalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <GlobalAlert status="announcement">
      <GlobalAlert.Header>
        <GlobalAlert.Title>
          Systemet vil være utilgjengelig natt til søndag
        </GlobalAlert.Title>
        <GlobalAlert.CloseButton onClick={() => alert("Lukket alert")} />
      </GlobalAlert.Header>
    </GlobalAlert>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 7,
  desc: "For korte meldinger kan man velge å kun vise tittel i alerten. Title er en `h2`-tagg som standard, husk å justere semantikken etter behov.",
};
