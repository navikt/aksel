import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Switch } from "../../form/switch";
import DragAndDrop from "../drag-and-drop/root/DragAndDropRoot";

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
    const [items, setItems] = React.useState([
      { id: "id", label: "Id" },
      { id: "name", label: "Name" },
      { id: "nationality", label: "Nationality" },
      { id: "dayJob", label: "Day job" },
      { id: "supervisor", label: "Supervisor" },
      { id: "dateReceived", label: "Date received" },
      { id: "message", label: "Message" },
      { id: "age", label: "Age" },
      {
        id: "forceSensitive",
        label: "Force sensitive",
      },
      { id: "homeSystem", label: "Home system" },
      { id: "skills", label: "Skills" },
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
