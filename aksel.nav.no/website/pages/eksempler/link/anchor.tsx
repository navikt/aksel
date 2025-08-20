import { BodyLong, Box, Link } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box id="toppen" paddingBlock="space-16">
      <Link href="#anker">Hopp til anker</Link>
      <BodyLong id="anker" style={{ margin: "1600px 0" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus quae
        iure nihil. Voluptatem enim ratione sit consequuntur ab quibusdam rem
        dicta amet dolorum asperiores. Voluptates, similique. Laborum deleniti
        nemo unde!
        <br />
        <Link href="#toppen">Hopp til toppen</Link>
      </BodyLong>
    </Box>
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
};
