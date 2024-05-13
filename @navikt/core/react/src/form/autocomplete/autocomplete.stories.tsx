import { Meta } from "@storybook/react";
import React from "react";
import { Search } from "../search";
import { Autocomplete, useAutocompleteValue } from "./Autocomplete";

export default {
  title: "Utilities/Autocomplete",
  component: Autocomplete,
} as Meta;

const MyAnchor = () => {
  const { value } = useAutocompleteValue();
  return (
    <Autocomplete.Anchor>
      <Search label="Søk på nav sine sider" value={value} />
    </Autocomplete.Anchor>
  );
};
const MyItem = ({ children }: { children: string }) => {
  const { setValue } = useAutocompleteValue();
  return (
    <Autocomplete.Item
      pick={() => {
        setValue(children);
      }}
    >
      <span>{children}</span>
    </Autocomplete.Item>
  );
};

export const Default = () => {
  return (
    <div className="navds-autocomplete-test-class-for-div-wrapper">
      <Autocomplete>
        <MyAnchor />
        <Autocomplete.Content>
          <MyItem>item #1</MyItem>
          <MyItem>item #2</MyItem>
          <MyItem>item #3</MyItem>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  );
};
