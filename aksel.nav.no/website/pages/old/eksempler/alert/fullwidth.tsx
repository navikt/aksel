import { Alert, Box, HGrid, Page } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Page contentBlockPadding="none">
      <Box borderWidth="1" height="60px"></Box>
      <HGrid columns="200px 1fr" align="start">
        <Box borderWidth="0 1 1 1" minHeight="calc(100vh - 60px)" />

        <Alert fullWidth variant="info">
          Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
          hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
          nedsatt arbeidsevnen.
        </Alert>
      </HGrid>
    </Page>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "'fullWidth' fjerner 'border-radius' slik at alerten blir bedre egnet for å vises i full bredde på toppen av en ramme, som et banner.",
};
