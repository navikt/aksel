import { LocalAlert } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <LocalAlert status="announcement">
      <LocalAlert.Header>
        <LocalAlert.Title>
          Nyhet! Nå kan du ettersende vedlegg digitalt
        </LocalAlert.Title>
        <LocalAlert.CloseButton onClick={() => alert("Lukket alert")} />
      </LocalAlert.Header>
    </LocalAlert>
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
