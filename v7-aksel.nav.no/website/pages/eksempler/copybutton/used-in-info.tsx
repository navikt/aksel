import { Box, CopyButton, HGrid } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box borderColor="border-subtle" borderWidth="1 0 0">
      <Row text="Addresse 1:">Osloveien 99, 0111 Oslo</Row>
      <Row text="Addresse 2:">Bergenveien 99, 2233 Bergen</Row>
      <Row text="Telefon:">4040404040</Row>
      <Row text="E-post:">nav@naversen.no</Row>
    </Box>
  );
};

const Row = ({ children, text }: any) => (
  <Box borderColor="border-subtle" borderWidth="0 0 1" paddingBlock="space-4">
    <HGrid columns="1fr 4fr auto" gap="space-8" align="center">
      <span>{text}</span>
      <span>{children}</span>
      <CopyButton size="small" copyText={children} />
    </HGrid>
  </Box>
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
  legacyOnly: true,
};

export const args = {
  index: 10,
  desc: "Ved utlisting av mye relevant innhold, kan CopyButton brukes for å enklere kopiere informasjonen.",
};
