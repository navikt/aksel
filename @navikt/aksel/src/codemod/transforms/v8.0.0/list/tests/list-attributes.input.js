import { List } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <List
      title="Title"
      description="Desc"
      size="small"
      as="ol"
      className="my-class"
      id="my-id"
      aria-label="My List"
      aria-labelledby="some-id"
      data-testid="list-test"
      key="list-key"
      role="presentation"
    >
      <List.Item>Item</List.Item>
    </List>
  );
};
