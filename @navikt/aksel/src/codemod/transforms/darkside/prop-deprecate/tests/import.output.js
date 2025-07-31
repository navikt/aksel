import { Accordion, Alert, Box, Page, Popover } from "@navikt/ds-react";

export const Demo = () => (
  <Page>
    <Alert
      variant="error" // should remain untouched
      background="#ff0000" // should remain untouched
    >
      dette er en feilmelding
    </Alert>
    <Accordion hidden>
      <Accordion.Item>
        <Accordion.Header>Section 1</Accordion.Header>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Section 2</Accordion.Header>
        <Accordion.Content>Content 2</Accordion.Content>
      </Accordion.Item>
    </Accordion>
    <Button ref={buttonRef} onClick={() => setOpenState(true)}>
      Åpne popover
    </Button>
    <Popover
      open={openState}
      onClose={() => setOpenState(false)}
      anchorEl={buttonRef.current}
    >
      <Popover.Content>Innhold her!</Popover.Content>
    </Popover>
    <Page.Block></Page.Block>
    <Box background="surface-danger">should remain untouched</Box>
  </Page>
);
