import { List, Box, Heading as CustomHeading } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <Box marginBlock="space-16" asChild>
        <CustomHeading>Heading</CustomHeading>
      </Box>
      <List
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
      >
        <List.Item>
          lorem ipsum
        </List.Item>
        <List.Item>
          lorem ipsum
        </List.Item>
      </List>
    </div>
  );
};
