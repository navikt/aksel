import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Switch } from "../../form/switch";
import DragAndDrop from "../drag-and-drop/root/DragAndDropRoot";
import { ColumnDefinition } from "../table/root/DataTable.types";

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
      { id: "id", label: "Id", cell: (item) => item },
      { id: "name", label: "Name", cell: (item) => item },
      { id: "nationality", label: "Nationality", cell: (item) => item },
      { id: "dayJob", label: "Day job", cell: (item) => item },
      { id: "supervisor", label: "Supervisor", cell: (item) => item },
      { id: "dateReceived", label: "Date received", cell: (item) => item },
      { id: "message", label: "Message", cell: (item) => item },
      { id: "age", label: "Age", cell: (item) => item },
      { id: "forceSensitive", label: "Force sensitive", cell: (item) => item },
      { id: "homeSystem", label: "Home system", cell: (item) => item },
      { id: "skills", label: "Skills", cell: (item) => item },
    ]);

    return (
      <DragAndDrop
        setItems={setItems}
        items={items}
        renderItem={(item) => <Switch size="small">{item.label}</Switch>}
      />
    );
  },
};
