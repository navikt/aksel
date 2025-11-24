import { BodyShort, Box, Heading, List } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <div>
        <Heading level="2" size="xsmall">
          Lorem Ipsum Dolor Sit Amet
        </Heading>
        <BodyShort size="small">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel
          risus volutpat.
        </BodyShort>
        <Box marginBlock="space-12" asChild>
          <List>
            <List.Item>lorem ipsum</List.Item>
            <List.Item>lorem ipsum</List.Item>
          </List>
        </Box>
      </div>
      <div>
        <Heading level="2" size="medium">
          Lorem Ipsum Dolor Sit Amet
        </Heading>
        <BodyShort size="large">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel
          risus volutpat.
        </BodyShort>
        <Box marginBlock="space-16" asChild>
          <List>
            <List.Item>lorem ipsum</List.Item>
            <List.Item>lorem ipsum</List.Item>
          </List>
        </Box>
      </div>
    </div>
  );
};
