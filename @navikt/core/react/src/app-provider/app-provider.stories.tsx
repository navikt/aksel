import React from "react";
import { AppProvider } from ".";
import {
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  ErrorSummary,
  Switch,
  Tag,
  TextField,
} from "..";

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
    <div className="colgap">
      <Button>Knapp</Button>
      <Alert variant="info">Alert</Alert>
      <Tag variant="info">Tag</Tag>
      <CheckboxGroup legend="Group legend" defaultValue={["tekst2"]}>
        <Checkbox value="tekst">Checkboxtekst</Checkbox>
        <Checkbox value="tekst2">Checkboxtekst</Checkbox>
      </CheckboxGroup>
      <ErrorSummary heading="Feiloppsummering komponent">
        <ErrorSummary.Item href="#1">Checkbox må fylles ut</ErrorSummary.Item>
        <ErrorSummary.Item href="#2">
          Tekstfeltet må ha en godkjent e-mail
        </ErrorSummary.Item>
      </ErrorSummary>
      <Switch checked loading>
        Label text
      </Switch>
      <TextField label="Ipsum enim quis culpa" />
    </div>
  </AppProvider>
);
