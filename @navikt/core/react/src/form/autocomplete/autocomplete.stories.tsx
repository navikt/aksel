import { Meta } from "@storybook/react";
import React from "react";
import { Search } from "../search";
import { Autocomplete, useAutocompleteValue } from "./Autocomplete";

export default {
  title: "Utilities/Autocomplete",
  component: Autocomplete,
} as Meta;

const MySearch = () => {
  const { value } = useAutocompleteValue();
  return <Search label="Søk på nav sine sider" value={value} />;
};

export const Default = () => {
  return (
    <div className="navds-autocomplete-test-class-for-div-wrapper">
      <Autocomplete>
        <Autocomplete.Anchor>
          <MySearch />
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
