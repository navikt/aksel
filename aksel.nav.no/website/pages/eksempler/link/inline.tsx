import { withDsExample } from "@/web/examples/withDsExample";
import { PlusCircleFillIcon } from "@navikt/aksel-icons";
import { BodyLong, Link } from "@navikt/ds-react";

const Example = () => {
  return (
    <BodyLong>
      Officia incididunt Culpa sit aute est duis minim in in voluptate velit
      Incididunt laborum nisi nisi Lorem officia adipisicing non veniam{" "}
      <Link href="#" inlineText>
        lenke til ny side
        <PlusCircleFillIcon aria-hidden />
      </Link>{" "}
      Culpa sit aute est duis minim in in voluptate velit Incididunt laborum
      nisi nisi Lorem officia adipisicing non veniam occaecat commodo id ad
      aliquip.
    </BodyLong>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
