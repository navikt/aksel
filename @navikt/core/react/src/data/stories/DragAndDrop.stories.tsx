import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Switch } from "../../form/switch";
import DragAndDrop from "../drag-and-drop/root/DataDragAndDropRoot";

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
      { id: "id", content: "Id" },
      { id: "name", content: "Name" },
      { id: "nationality", content: "Nationality" },
      { id: "dayJob", content: "Day job" },
      { id: "supervisor", content: "Supervisor" },
      { id: "dateReceived", content: "Date received" },
      { id: "message", content: "Message" },
      { id: "age", content: "Age" },
      { id: "forceSensitive", content: "Force sensitive" },
      { id: "homeSystem", content: "Home system" },
      { id: "skills", content: "Skills" },
    ]);

    return (
      <>
        <DragAndDrop setItems={setItems}>
          {items.map((item, index) => (
            <DragAndDrop.Item key={item.id} id={item.id} index={index}>
              <Switch size="small" defaultChecked>
                {item.content}
              </Switch>
            </DragAndDrop.Item>
          ))}
        </DragAndDrop>
      </>
    );
  },
};
