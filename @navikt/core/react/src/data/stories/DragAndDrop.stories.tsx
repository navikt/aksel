import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Switch } from "../../form/switch";
import DragAndDrop from "../drag-and-drop/root/DragAndDropRoot";
import type { ColumnDefinition } from "../table/root/DataGridTable.types";

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
      { id: "id", header: "Id", bodyCell: (item) => item },
      { id: "name", header: "Name", bodyCell: (item) => item },
      { id: "nationality", header: "Nationality", bodyCell: (item) => item },
      { id: "dayJob", header: "Day job", bodyCell: (item) => item },
      { id: "supervisor", header: "Supervisor", bodyCell: (item) => item },
      { id: "dateReceived", header: "Date received", bodyCell: (item) => item },
      { id: "message", header: "Message", bodyCell: (item) => item },
      { id: "age", header: "Age", bodyCell: (item) => item },
      {
        id: "forceSensitive",
        header: "Force sensitive",
        bodyCell: (item) => item,
      },
      { id: "homeSystem", header: "Home system", bodyCell: (item) => item },
      { id: "skills", header: "Skills", bodyCell: (item) => item },
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
