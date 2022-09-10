import React from "react";
import { AppProvider } from ".";
import { Alert, Button, Tag } from "..";

export default {
  title: "ds-react/AppProvider",
  component: AppProvider,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
};

export const Default = (props) => (
  <AppProvider options={{ size: props.size }}>
    <Button>Knapp</Button>
    <Alert variant="info">Alert</Alert>
    <Tag variant="info">Tag</Tag>
  </AppProvider>
);
