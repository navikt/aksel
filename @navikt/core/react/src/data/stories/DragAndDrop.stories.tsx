import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Switch } from "../../form/switch";
import DragAndDrop from "../drag-and-drop/root/DragAndDropRoot";
import { ColumnDefinition } from "../table/root/DataGridTable.types";

const meta: Meta<typeof DragAndDrop> = {
  title: "ds-react/Data/DragAndDrop",
  component: DragAndDrop,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DragAndDrop>;

export const Default: Story = {
  render: () => {
    const [items, setItems] = React.useState<ColumnDefinition<string>[]>([
      { id: "id", header: "Id", cell: (item) => item },
      { id: "name", header: "Name", cell: (item) => item },
      { id: "nationality", header: "Nationality", cell: (item) => item },
      { id: "dayJob", header: "Day job", cell: (item) => item },
      { id: "supervisor", header: "Supervisor", cell: (item) => item },
      { id: "dateReceived", header: "Date received", cell: (item) => item },
      { id: "message", header: "Message", cell: (item) => item },
      { id: "age", header: "Age", cell: (item) => item },
      { id: "forceSensitive", header: "Force sensitive", cell: (item) => item },
      { id: "homeSystem", header: "Home system", cell: (item) => item },
      { id: "skills", header: "Skills", cell: (item) => item },
    ]);

    return (
      <DragAndDrop
        setItems={setItems}
        items={items}
        renderItem={(item) => <Switch size="small">{item.header}</Switch>}
      />
    );
  },
};
