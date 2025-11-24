import { List, Heading, BodyShort, Box } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <Heading as="h3" size="small">
        Lorem Ipsum Dolor Sit Amet
      </Heading>
      <BodyShort>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel
        risus volutpat.
      </BodyShort>
      <Box marginBlock="space-16" asChild>
        <List data-aksel-migrated-v8>
          <List.Item>
            lorem ipsum
          </List.Item>
          <List.Item>
            lorem ipsum
          </List.Item>
        </List>
      </Box>
    </div>
  );
};
