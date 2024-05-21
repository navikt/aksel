import { Meta } from "@storybook/react";
import React, { ReactNode } from "react";
import { HangerIcon, PuzzlePieceIcon, RulerIcon } from "@navikt/aksel-icons";
import { Search } from "../search";
import { Autocomplete, useAutocompleteValue } from "./Autocomplete";

export default {
  title: "Utilities/Autocomplete",
  component: Autocomplete,
} as Meta;

const MyAnchor = () => {
  const { value } = useAutocompleteValue();
  return (
    <Autocomplete.Anchor
      pick={() => {
        console.log(`pick(): searching for ${value}`);
      }}
    >
      <Search label="Søk på nav sine sider" value={value} />
    </Autocomplete.Anchor>
  );
};
const MyItem = ({ children, icon }: { children: string; icon: ReactNode }) => {
  const { setValue } = useAutocompleteValue();
  return (
    <Autocomplete.Item
      focus={() => {
        setValue(children);
      }}
    >
      <span>
        {icon}
        <span>{children}</span>
      </span>
    </Autocomplete.Item>
  );
};

export const Default = () => {
  return (
    <div className="navds-autocomplete-test-class-for-div-wrapper">
      <Autocomplete>
        <MyAnchor />
        <Autocomplete.Content>
          <MyItem icon={<HangerIcon aria-hidden />}>hanger </MyItem>
          <MyItem icon={<HangerIcon aria-hidden />}>hanger </MyItem>
          <MyItem icon={<HangerIcon aria-hidden />}>hanger </MyItem>
          <MyItem icon={<HangerIcon aria-hidden />}>hanger </MyItem>
          <MyItem icon={<HangerIcon aria-hidden />}>hanger </MyItem>
          <MyItem icon={<HangerIcon aria-hidden />}>hanger </MyItem>
          <MyItem icon={<RulerIcon aria-hidden />}>ruler </MyItem>
          <MyItem icon={<PuzzlePieceIcon aria-hidden />}>puzzle piece </MyItem>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  );
};
