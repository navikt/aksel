import { Meta } from "@storybook/react";
import React from "react";
import { Search } from "../search";
import { Autocomplete } from "./Autocomplete";

export default {
  title: "Utilities/Autocomplete",
  component: Autocomplete,
} as Meta;

export const Default = () => {
  return (
    <div className="navds-autocomplete-test-class-for-div-wrapper">
      <p>test text</p>
      <Autocomplete>
        <Autocomplete.Anchor>
          <Search label="Søk på nav sine sider" />
        </Autocomplete.Anchor>
        <Autocomplete.Content>
          <Autocomplete.Item>
            <p>item #1</p>
          </Autocomplete.Item>
          <Autocomplete.Item>
            <p>item #2</p>
          </Autocomplete.Item>
          <Autocomplete.Item>
            <p>item #3</p>
          </Autocomplete.Item>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  );
};
