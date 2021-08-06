import React, { useState } from "react";
import { Checkbox, CheckboxGroup } from "../../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/form/checkbox",
  component: Checkbox,
} as Meta;

export const All = () => {
  return (
    <>
      <Checkbox>DoloreIn quis consectetur proident id adipisicing ut.</Checkbox>
      <Checkbox size="s">Dolore Lorem amet sunt exercitation.</Checkbox>
      <Checkbox disabled>Dolore Lorem amet sunt exercitation</Checkbox>
      <Checkbox error="testerror">Dolore Lorem amet sunt exercitation</Checkbox>
      <Checkbox error="testerror" size="s">
        Dolore Lorem amet sunt exercitation
      </Checkbox>
      <Checkbox disabled error="testerror">
        Dolore Lorem amet sunt exercitation
      </Checkbox>
      <Checkbox disabled checked>
        Dolore Lorem amet sunt exercitation
      </Checkbox>
    </>
  );
};

export const Group = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <>
      <CheckboxGroup
        legend="Checkbox group"
        defaultValue={["Banana", "Orange"]}
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox value="Banana">Banana</Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>

      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
        error="error message"
        defaultValue={["Banana", "Orange"]}
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox value="Banana">Banana</Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>
      <h2>All disabled</h2>
      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
        error="error message"
        defaultValue={["Banana", "Orange"]}
        disabled
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox value="Banana">Banana</Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>

      <CheckboxGroup
        legend="Controlled checkbox group"
        description="This is the description"
        value={selected}
        onChange={setSelected}
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox value="Banana">Banana</Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>
      <div>You have selected: {selected.join(", ")}</div>

      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
        error="error message"
        disabled
        defaultValue={["Banana", "Orange"]}
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox value="Banana">Banana</Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
        error="error message"
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox error="Checkbox-spesific error" value="Banana">
          Banana
        </Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
        error="error message"
        errorPropagation={false}
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox error="Checkbox-spesific error" value="Banana">
          Banana
        </Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
        error=""
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox error="Checkbox-spesific error" value="Banana">
          Banana
        </Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>
      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
        error
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox error="Checkbox-spesific error" value="Banana">
          Banana
        </Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>
      <h2>With description</h2>
      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox value="Banana">Banana</Checkbox>
        <Checkbox description="Checkbox description" value="Orange">
          Orange
        </Checkbox>
        <Checkbox value="Melon">Melon</Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>
      <h2>Size "s"</h2>
      <CheckboxGroup
        legend="Checkbox group"
        description="This is the description"
        size="s"
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox value="Banana">Banana</Checkbox>
        <Checkbox description="Checkbox description" value="Orange">
          Orange
        </Checkbox>
        <Checkbox error="testerror" value="Melon">
          Melon
        </Checkbox>
        <Checkbox disabled value="Cherry">
          Cherry
        </Checkbox>
      </CheckboxGroup>
    </>
  );
};
