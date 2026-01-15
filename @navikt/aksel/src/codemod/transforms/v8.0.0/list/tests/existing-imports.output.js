import { List, Box, Heading as CustomHeading, BodyShort } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <Box marginBlock="space-16" asChild>
        <CustomHeading>Heading</CustomHeading>
      </Box>
      <div>
        <CustomHeading as="h3" size="small">
          Lorem Ipsum Dolor Sit Amet
        </CustomHeading>
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
    </div>
  );
};
