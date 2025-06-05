import { Link, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="3" align="start">
      <Link variant="action" href="variants">
        Action variant
      </Link>
      <Link variant="neutral" href="variants">
        Neutral variant
      </Link>
      <Link variant="subtle" href="variants">
        Subtle variant
      </Link>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Ikke bruk action-varianten på farget bakgrunn.",
};
