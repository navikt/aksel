import { withDsExample } from "@/web/examples/withDsExample";
import { Link } from "@navikt/ds-react";
import NextLink from "next/link";

const Example = () => {
  return (
    <Link href="#" as={NextLink}>
      Lenke til ny side
    </Link>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  sandbox: false,
};
