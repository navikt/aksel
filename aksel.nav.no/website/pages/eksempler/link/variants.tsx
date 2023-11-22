import { withDsExample } from "@/web/examples/withDsExample";
import { Link, VStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <VStack gap="3">
      <Link href="#" variant="action">
        Action variant
      </Link>
      <Link href="#" variant="neutral">
        Neutral variant
      </Link>
      <Link href="#" variant="subtle">
        Subtle variant
      </Link>
    </VStack>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Ikke bruk action-varianten på farget bakgrunn.",
};
