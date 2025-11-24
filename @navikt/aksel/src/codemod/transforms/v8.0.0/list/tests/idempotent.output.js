import { List } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <List title="Should not migrate" data-aksel-migrated-v8>
      <List.Item>Item</List.Item>
    </List>
  );
};
