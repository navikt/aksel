import { PlusCircleFillIcon } from "@navikt/aksel-icons";
import { BodyLong, Link } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <BodyLong>
      Officia incididunt Culpa sit aute est duis minim in in voluptate velit
      Incididunt laborum nisi nisi Lorem officia adipisicing non veniam culpa
      sit aute est duis{" "}
      <Link inlineText href="/eksempel">
        dette er en ganske lang lenke som brekker til flere linjer ved behov
        <PlusCircleFillIcon aria-hidden />
      </Link>{" "}
      minim in in voluptate velit Incididunt laborum nisi nisi Lorem officia
      adipisicing non veniam occaecat commodo id ad aliquip.
    </BodyLong>
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
  desc: "Prop-en 'inlineText' gjør at teksten wrapper.",
};
