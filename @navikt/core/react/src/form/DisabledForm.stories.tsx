import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../button";
import { HStack, VStack } from "../primitives/stack";
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
  const [opacity, setOpacity] = React.useState(() => {
    const tokenvalue = getComputedStyle(document.documentElement)
      .getPropertyValue("--ax-opacity-disabled")
      .trim();
    return tokenvalue;
  });

  return (
    <VStack gap="space-8" style={{ maxWidth: 600, padding: "2rem" }}>
      <div>
        <label htmlFor="opacity">{`Opacity for disabled elements: ${opacity}`}</label>
      </div>
      <input
        type="range"
        id="opacity"
        name="opacity"
        min="0"
        max="1"
        step="0.1"
        value={opacity}
        onChange={(e) => {
          const newOpacity = e.target.value;
          setOpacity(newOpacity);
          document.documentElement.style.setProperty(
            "--ax-opacity-disabled",
            newOpacity,
          );
        }}
      />
      <HStack gap="space-4">
        <Button disabled type="submit" variant="primary">
          Button
        </Button>
        <Button disabled type="submit" variant="secondary">
          Button
        </Button>
        <Button disabled type="submit" variant="tertiary">
          Button
        </Button>
      </HStack>
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
