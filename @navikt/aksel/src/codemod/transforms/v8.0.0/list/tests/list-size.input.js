import { List } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <List
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
        size="small"
      >
        <List.Item>lorem ipsum</List.Item>
        <List.Item>lorem ipsum</List.Item>
      </List>
      <List
        title="Lorem Ipsum Dolor Sit Amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
        size="large"
      >
        <List.Item>lorem ipsum</List.Item>
        <List.Item>lorem ipsum</List.Item>
      </List>
    </div>
  );
};
