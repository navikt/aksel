import { List, Heading, BodyShort, Box } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <div>
        <Heading as="h3" size="xsmall">
          Lorem Ipsum Dolor Sit Amet
        </Heading>
        <BodyShort size="small">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel
          risus volutpat.
        </BodyShort>
        <Box marginBlock="space-12" asChild>
          <List size="small">
            <List.Item>lorem ipsum</List.Item>
            <List.Item>lorem ipsum</List.Item>
          </List>
        </Box>
      </div>
      <div>
        <Heading as="h3" size="medium">
          Lorem Ipsum Dolor Sit Amet
        </Heading>
        <BodyShort size="large">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel
          risus volutpat.
        </BodyShort>
        <Box marginBlock="space-16" asChild>
          <List size="large">
            <List.Item>lorem ipsum</List.Item>
            <List.Item>lorem ipsum</List.Item>
          </List>
        </Box>
      </div>
    </div>
  );
};
