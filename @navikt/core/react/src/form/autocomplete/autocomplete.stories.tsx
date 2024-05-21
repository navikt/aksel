import { Meta } from "@storybook/react";
import React, { ReactNode, forwardRef, useRef, useState } from "react";
import {
  CloudIcon,
  HangerIcon,
  HourglassIcon,
  HouseIcon,
  PuzzlePieceIcon,
  RulerIcon,
} from "@navikt/aksel-icons";
import { Popover } from "../../popover";
import { Search } from "../search";
import { Autocomplete, useAutocompleteValue } from "./Autocomplete";

export default {
  title: "Utilities/Autocomplete",
  component: Autocomplete,
} as Meta;

const MyAnchor = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    const { value } = useAutocompleteValue();
    return (
      <div style={{ position: "relative" }}>
        <Autocomplete.Anchor
          ref={ref}
          pick={() => {
            console.log(`pick(): searching for ${value}`);
          }}
        >
          <Search
            label="Søk på nav sine sider"
            autoComplete="off"
            value={value}
          />
        </Autocomplete.Anchor>
        {children}
      </div>
    );
  },
);
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
        <MyAnchor>
          <Autocomplete.Content>
            <MyItem icon={<CloudIcon aria-hidden />}>cloud </MyItem>
            <MyItem icon={<HangerIcon aria-hidden />}>hanger </MyItem>
            <MyItem icon={<HourglassIcon aria-hidden />}>hourglass </MyItem>
            <MyItem icon={<HouseIcon aria-hidden />}>house </MyItem>
            <MyItem icon={<RulerIcon aria-hidden />}>ruler </MyItem>
            <MyItem icon={<PuzzlePieceIcon aria-hidden />}>
              {"puzzle piece "}
            </MyItem>
          </Autocomplete.Content>
        </MyAnchor>
      </Autocomplete>
    </div>
  );
};

const MyDropDownSearchAutocomplete = () => {
  const { value } = useAutocompleteValue();
  const anchorRef = useRef<HTMLDivElement>(null);
  const [openState, setOpenState] = useState(false);

  const items = [
    {
      icon: <CloudIcon aria-hidden />,
      text: "cloud ",
    },
    {
      icon: <HangerIcon aria-hidden />,
      text: "hanger ",
    },
    {
      icon: <HourglassIcon aria-hidden />,
      text: "hourglass ",
    },
    {
      icon: <HouseIcon aria-hidden />,
      text: "house ",
    },
    {
      icon: <RulerIcon aria-hidden />,
      text: "ruler ",
    },
    {
      icon: <PuzzlePieceIcon aria-hidden />,
      text: "puzzle piece ",
    },
  ];

  // const filteredItems = items.filter((i) =>
  //   i.text.trim().toLowerCase().startsWith(value.trim().toLowerCase()),
  // );
  const filteredItems = items;

  return (
    <>
      <style>
        {`
.dropdown-search-autocomplete {
  width: 100%;
}
`}
      </style>
      <MyAnchor ref={anchorRef}>
        <Popover
          className="dropdown-search-autocomplete"
          anchorEl={anchorRef.current}
          open={openState || (!!value.length && !!filteredItems.length)}
          onClose={() => {
            setOpenState(false);
          }}
          arrow={false}
          offset={0}
          placement="bottom"
        >
          <Autocomplete.Content>
            <Popover.Content>
              {filteredItems.map((i) => {
                return (
                  <MyItem key={i.text} icon={i.icon}>
                    {i.text}
                  </MyItem>
                );
              })}
            </Popover.Content>
          </Autocomplete.Content>
        </Popover>
      </MyAnchor>
    </>
  );
};

export const WithPopoverAndFiltering = () => {
  return (
    <div>
      <Autocomplete>
        <MyDropDownSearchAutocomplete />
      </Autocomplete>
    </div>
  );
};
