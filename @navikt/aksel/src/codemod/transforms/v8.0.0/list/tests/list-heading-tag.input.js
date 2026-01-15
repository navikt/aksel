import { List } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <List
      title="Lorem Ipsum Dolor Sit Amet"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel risus volutpat."
      headingTag="h4"
    >
      <List.Item>
        lorem ipsum
      </List.Item>
      <List.Item>
        lorem ipsum
      </List.Item>
    </List>
  );
};
