import { List, Heading, BodyShort, Box } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div
      className="my-class"
      id="my-id"
      data-testid="list-test"
      key="list-key"
      role="presentation"
    >
      <Heading level="2" size="xsmall">
        Title
      </Heading>
      <BodyShort size="small">
        Desc
      </BodyShort>
      <Box marginBlock="space-12" asChild>
        <List size="small" as="ol" aria-label="My List" aria-labelledby="some-id">
          <List.Item>Item</List.Item>
        </List>
      </Box>
    </div>
  );
};
