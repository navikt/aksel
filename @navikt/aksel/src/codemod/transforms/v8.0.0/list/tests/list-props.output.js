import { List, Heading, Box, BodyShort } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <div>
        <Heading level="3" size="small">
          Lorem Ipsum Dolor Sit Amet
        </Heading>
        <Box marginBlock="space-16" asChild>
          <List>
            <List.Item>lorem ipsum</List.Item>
            <List.Item>lorem ipsum</List.Item>
          </List>
        </Box>
      </div>
      <div>
        <BodyShort>
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
