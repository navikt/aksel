import React from "react";
import { ActionMenu, Button } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [rows, setRows] = React.useState<number>(5);

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button variant="secondary-neutral">Rader per side: {rows}</Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Item onSelect={() => setRows(5)}>5</ActionMenu.Item>
        <ActionMenu.Item onSelect={() => setRows(10)}>10</ActionMenu.Item>
        <ActionMenu.Item onSelect={() => setRows(25)}>25</ActionMenu.Item>
        <ActionMenu.Item onSelect={() => setRows(50)}>50</ActionMenu.Item>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
