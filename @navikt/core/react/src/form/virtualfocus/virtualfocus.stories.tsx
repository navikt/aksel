import { Meta } from "@storybook/react";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  forwardRef,
  useRef,
  useState,
} from "react";
import {
  CloudIcon,
  HangerIcon,
  HourglassIcon,
  HouseIcon,
  PuzzlePieceIcon,
  RulerIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { Popover } from "../../popover";
import { Search } from "../search";
import { VirtualFocus, useVirtualFocusDescendant } from "./VirtualFocus";

export default {
  title: "Utilities/VirtualFocus",
  component: VirtualFocus,
  decorators: [
    (Story) => (
      <VStack gap="10">
        <Button>above</Button>
        <Story />
        <Button>below</Button>
      </VStack>
    ),
  ],
} as Meta;

const MyAnchor = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  }
>(({ children, value, setValue }, ref) => {
  const { descendants } = useVirtualFocusDescendant();
  const searchRef = useRef<HTMLInputElement>(null);

  const to_focus = descendants.item(0);

  return (
    <div style={{ position: "relative" }}>
      <VirtualFocus.Anchor
        ref={ref}
        onSelect={() => {
          console.log(`onSelect(): ${value}`);
        }}
        onActive={() => {
          console.log(`onActive(): Anchor`);
        }}
      >
        <Search
          label="Søk på nav sine sider"
          autoComplete="off"
          value={value}
          onChange={(current_input) => {
            setValue(current_input);
            to_focus?.handleOnActive();
          }}
          ref={searchRef}
        />
      </VirtualFocus.Anchor>
      {children}
    </div>
  );
});
const MyItem = ({
  children,
  icon,
  setValue,
}: {
  children: string;
  icon: ReactNode;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <VirtualFocus.Item
      // rename focus -> onActive
      onActive={() => {
        setValue(children);
      }}
      onSelect={() => {
        console.log(`onSelect(): ${children}`);
      }}
      role="button"
    >
      <span>
        {icon}
        <span>{children}</span>
      </span>
    </VirtualFocus.Item>
  );
};

export const Default = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <style>{`
[data-aksel-virtualfocus="true"] {
  outline: solid 3px var(--a-border-focus);
  border-radius: var(--a-border-radius-medium);
}
`}</style>
      <VirtualFocus role="combobox">
        <MyAnchor setValue={setValue} value={value}>
          <VirtualFocus.Content>
            <MyItem setValue={setValue} icon={<CloudIcon aria-hidden />}>
              {"cloud "}
            </MyItem>
            <MyItem setValue={setValue} icon={<HangerIcon aria-hidden />}>
              {"hanger "}
            </MyItem>
            <MyItem setValue={setValue} icon={<HourglassIcon aria-hidden />}>
              {"hourglass "}
            </MyItem>
            <MyItem setValue={setValue} icon={<HouseIcon aria-hidden />}>
              {"house "}
            </MyItem>
            <MyItem setValue={setValue} icon={<RulerIcon aria-hidden />}>
              {"ruler "}
            </MyItem>
            <MyItem setValue={setValue} icon={<PuzzlePieceIcon aria-hidden />}>
              {"puzzle piece "}
            </MyItem>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
    </>
  );
};

export const Loop = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <style>{`
[data-aksel-virtualfocus="true"] {
  outline: solid 3px var(--a-border-focus);
  border-radius: var(--a-border-radius-medium);
}
`}</style>
      <VirtualFocus role="listbox" loop={true}>
        <MyAnchor setValue={setValue} value={value}>
          <VirtualFocus.Content>
            <MyItem setValue={setValue} icon={<CloudIcon aria-hidden />}>
              {"cloud "}
            </MyItem>
            <MyItem setValue={setValue} icon={<HangerIcon aria-hidden />}>
              {"hanger "}
            </MyItem>
            <MyItem setValue={setValue} icon={<HourglassIcon aria-hidden />}>
              {"hourglass "}
            </MyItem>
            <MyItem setValue={setValue} icon={<HouseIcon aria-hidden />}>
              {"house "}
            </MyItem>
            <MyItem setValue={setValue} icon={<RulerIcon aria-hidden />}>
              {"ruler "}
            </MyItem>
            <MyItem setValue={setValue} icon={<PuzzlePieceIcon aria-hidden />}>
              {"puzzle piece "}
            </MyItem>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
    </>
  );
};

export const Multiple = () => {
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  return (
    <>
      <style>{`
[data-aksel-virtualfocus="true"] {
  outline: solid 3px var(--a-border-focus);
  border-radius: var(--a-border-radius-medium);
}
`}</style>
      <VirtualFocus role="listbox">
        <MyAnchor setValue={setValue} value={value}>
          <VirtualFocus.Content>
            <MyItem setValue={setValue} icon={<CloudIcon aria-hidden />}>
              {"cloud "}
            </MyItem>
            <MyItem setValue={setValue} icon={<HangerIcon aria-hidden />}>
              {"hanger "}
            </MyItem>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
      <VirtualFocus role="listbox">
        <MyAnchor setValue={setValue2} value={value2}>
          <VirtualFocus.Content>
            <MyItem setValue={setValue2} icon={<CloudIcon aria-hidden />}>
              {"cloud "}
            </MyItem>
            <MyItem setValue={setValue2} icon={<HangerIcon aria-hidden />}>
              {"hanger "}
            </MyItem>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
      <VirtualFocus role="listbox">
        <MyAnchor setValue={setValue3} value={value3}>
          <VirtualFocus.Content>
            <MyItem setValue={setValue3} icon={<CloudIcon aria-hidden />}>
              {"cloud "}
            </MyItem>
            <MyItem setValue={setValue3} icon={<HangerIcon aria-hidden />}>
              {"hanger "}
            </MyItem>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
    </>
  );
};

const MyDropDownSearchVirtualfocus = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [openState, setOpenState] = useState(false);
  const [value, setValue] = useState("");

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
.dropdown-search-virtualfocus {
  width: 100%;
}
[data-aksel-virtualfocus="true"] {
  outline: solid 3px var(--a-border-focus);
  border-radius: var(--a-border-radius-medium);
}
`}
      </style>
      <MyAnchor setValue={setValue} value={value} ref={anchorRef}>
        <Popover
          className="dropdown-search-virtualfocus"
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
                  <MyItem setValue={setValue} key={i.text} icon={i.icon}>
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
      <VirtualFocus role="listbox">
        <MyDropDownSearchVirtualfocus />
      </VirtualFocus>
    </div>
  );
};
