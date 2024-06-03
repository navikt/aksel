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
import { VirtualFocus, useAutocompleteValue } from "./Autocomplete";

export default {
  title: "Utilities/Autocomplete",
  component: VirtualFocus,
} as Meta;

const MyAnchor = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    const { value } = useAutocompleteValue();
    return (
      <div style={{ position: "relative" }}>
        <VirtualFocus.Anchor
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
        </VirtualFocus.Anchor>
        {children}
      </div>
    );
  },
);
const MyItem = ({ children, icon }: { children: string; icon: ReactNode }) => {
  const { setValue } = useAutocompleteValue();
  return (
    <VirtualFocus.Item
      // rename focus -> onActive
      focus={() => {
        setValue(children);
      }}
    >
      <span>
        {icon}
        <span>{children}</span>
      </span>
    </VirtualFocus.Item>
  );
};

export const Default = () => {
  return (
    <>
      <style>{`
.navds-autocomplete-item[data-aksel-virtualfocus="true"] {
  outline: solid 3px var(--a-border-focus);
  border-radius: var(--a-border-radius-medium);
}
`}</style>
      <VirtualFocus>
        <MyAnchor>
          <VirtualFocus.Content>
            <MyItem icon={<CloudIcon aria-hidden />}>cloud </MyItem>
            <MyItem icon={<HangerIcon aria-hidden />}>hanger </MyItem>
            <MyItem icon={<HourglassIcon aria-hidden />}>hourglass </MyItem>
            <MyItem icon={<HouseIcon aria-hidden />}>house </MyItem>
            <MyItem icon={<RulerIcon aria-hidden />}>ruler </MyItem>
            <MyItem icon={<PuzzlePieceIcon aria-hidden />}>
              {"puzzle piece "}
            </MyItem>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
    </>
  );
};

export const NoLoop = () => {
  return (
    <>
      <style>{`
.navds-autocomplete-item[data-aksel-virtualfocus="true"] {
  outline: solid 3px var(--a-border-focus);
  border-radius: var(--a-border-radius-medium);
}
`}</style>
      <VirtualFocus loop={false}>
        <MyAnchor>
          <VirtualFocus.Content>
            <MyItem icon={<CloudIcon aria-hidden />}>cloud </MyItem>
            <MyItem icon={<HangerIcon aria-hidden />}>hanger </MyItem>
            <MyItem icon={<HourglassIcon aria-hidden />}>hourglass </MyItem>
            <MyItem icon={<HouseIcon aria-hidden />}>house </MyItem>
            <MyItem icon={<RulerIcon aria-hidden />}>ruler </MyItem>
            <MyItem icon={<PuzzlePieceIcon aria-hidden />}>
              {"puzzle piece "}
            </MyItem>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
    </>
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

  const filteredItems = items.filter((i) =>
    i.text.trim().toLowerCase().startsWith(value.trim().toLowerCase()),
  );
  // const filteredItems = items;

  return (
    <>
      <style>
        {`
.dropdown-search-autocomplete {
  width: 100%;
}
.navds-autocomplete-item[data-aksel-virtualfocus="true"] {
  outline: solid 3px var(--a-border-focus);
  border-radius: var(--a-border-radius-medium);
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
          <VirtualFocus.Content>
            <Popover.Content>
              {filteredItems.map((i) => {
                return (
                  <MyItem key={i.text} icon={i.icon}>
                    {i.text}
                  </MyItem>
                );
              })}
            </Popover.Content>
          </VirtualFocus.Content>
        </Popover>
      </MyAnchor>
    </>
  );
};

export const WithPopoverAndFiltering = () => {
  return (
    <div>
      <VirtualFocus>
        <MyDropDownSearchAutocomplete />
      </VirtualFocus>
    </div>
  );
};
