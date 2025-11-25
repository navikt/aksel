import { List } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <List title="Lorem Ipsum Dolor Sit Amet">
        <List.Item>lorem ipsum</List.Item>
        <List.Item>lorem ipsum</List.Item>
      </List>
      <List description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat.">
        <List.Item>lorem ipsum</List.Item>
        <List.Item>lorem ipsum</List.Item>
      </List>
    </div>
  );
};
