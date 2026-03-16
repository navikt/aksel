import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DragVerticalIcon } from "@navikt/aksel-icons";
import { Switch } from "../../form/switch";
import { HStack } from "../../primitives/stack";
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

export const NoDndkit: Story = {
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
    type Elem = { id: string; index: number };
    const [draggingElem, setDraggingElem] = React.useState<Elem | null>(null);
    const [dropTarget, setDropTarget] = React.useState<Elem | null>(null);

    function handleDragStart(event, item, index) {
      setDraggingElem({ id: item.id, index });
      event.dataTransfer.setData("text/plain", item.id);
      event.dataTransfer.effectAllowed = "move";

      const preview = document.createElement("div");
      preview.innerHTML = `
    <div style="
      padding: 12px 16px;
      background: white;
      width: 100%;
    ">
      ⠿ ${item.content}
    </div>
  `;

      preview.style.position = "absolute";
      preview.style.top = "-9999px";
      preview.style.left = "-9999px";

      document.body.appendChild(preview);
      event.dataTransfer.setDragImage(preview, 12, 12);

      requestAnimationFrame(() => {
        document.body.removeChild(preview);
      });
    }

    return (
      <>
        {items.map((item, index) => {
          return (
            <HStack key={item.id} gap="space-8" asChild>
              <div
                key={item.id}
                style={{
                  padding: "8px",
                  marginBottom: "4px",
                  width: "200px",
                  backgroundColor:
                    dropTarget?.id === item.id ? "lightblue" : "white",
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDropTarget({ id: item.id, index });
                }}
                onDrop={() => {
                  if (draggingElem && dropTarget) {
                    const newItems = [...items];
                    const [removed] = newItems.splice(draggingElem.index, 1);
                    newItems.splice(dropTarget.index, 0, removed);
                    setItems(newItems);
                  }
                }}
              >
                <div
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, index)}
                  onDragEnd={() => {
                    setDraggingElem(null);
                    setDropTarget(null);
                  }}
                >
                  <DragVerticalIcon
                    aria-hidden
                    title="Dra for å flytte"
                    fontSize="1.5rem"
                  />
                </div>
                {item.content}
              </div>
            </HStack>
          );
        })}
      </>
    );
  },
};
