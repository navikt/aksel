import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { VStack } from "../primitives/stack";
import { Checkbox, CheckboxGroup } from "./checkbox";
import { UNSAFE_Combobox } from "./combobox";
import { Fieldset } from "./fieldset";
import { FileUpload } from "./file-upload";
import { Radio, RadioGroup } from "./radio";
import { Search } from "./search";
import { Select } from "./select";
import { Switch } from "./switch";
import { Textarea } from "./textarea";
import { TextField } from "./textfield";

function DisabledFormElements() {
  return (
    <VStack gap="space-8" style={{ maxWidth: 600, padding: "2rem" }}>
      <TextField label="TextField" disabled />

      <TextField label="TextField with value" disabled value="Disabled value" />

      <Textarea label="Textarea" disabled />

      <Textarea
        label="Textarea with value"
        disabled
        value="Disabled textarea value"
      />

      <Select label="Select" disabled>
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
      </Select>

      <Search label="Search" disabled />

      <Search label="Search (secondary)" variant="secondary" disabled />

      <Search label="Search (simple)" variant="simple" disabled />

      <CheckboxGroup legend="CheckboxGroup" defaultValue={["banan"]} disabled>
        <Checkbox value="banan">Banan</Checkbox>
        <Checkbox value="eple">Eple</Checkbox>
        <Checkbox value="appelsin">Appelsin</Checkbox>
      </CheckboxGroup>

      <RadioGroup legend="RadioGroup" defaultValue="banan" disabled>
        <Radio value="banan">Banan</Radio>
        <Radio value="eple">Eple</Radio>
        <Radio value="appelsin">Appelsin</Radio>
      </RadioGroup>

      <UNSAFE_Combobox
        label="Combobox"
        options={["Banan", "Eple", "Appelsin", "Mango"]}
        selectedOptions={["Banan"]}
        disabled
      />

      <Switch disabled>Switch (unchecked)</Switch>
      <Switch checked disabled>
        Switch (checked)
      </Switch>

      <Fieldset legend="Fieldset (disabled)" disabled>
        <TextField label="First field" />
        <TextField label="Second field" />
      </Fieldset>

      <FileUpload.Dropzone
        label="FileUpload Dropzone"
        onSelect={console.log}
        disabled
      />
    </VStack>
  );
}

export default {
  title: "ds-react/Form/Disabled Form Elements",
  component: DisabledFormElements,
} satisfies Meta<typeof DisabledFormElements>;

type Story = StoryObj<typeof DisabledFormElements>;

export const Default: Story = {};
