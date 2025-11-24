import { List, Box } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <Box marginBlock="space-16" asChild>
      <List data-aksel-migrated-v8>
        <List.Item>lorem ipsum</List.Item>
        <List.Item>lorem ipsum</List.Item>
      </List>
    </Box>
  );
};
