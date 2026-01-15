import { Meta } from "@storybook/react-vite";
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
import { Search } from "../../form/search";
import { VStack } from "../../layout/stack";
import { Popover } from "../../popover";
import { VirtualFocus } from "./VirtualFocus";

export default {
  title: "Utilities/VirtualFocus",
  component: VirtualFocus,
  decorators: [
    (Story) => (
      <VStack gap="space-40">
        <Button>above</Button>
        <Story />
        <Button>below</Button>
      </VStack>
    ),
  ],
  parameters: {
    chromatic: {
      disable: true,
    },
  },
} satisfies Meta<typeof VirtualFocus>;

const MyAnchor = forwardRef<
  HTMLInputElement,
  {
    children: React.ReactNode;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  }
>(({ children, value, setValue }, ref) => {
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ position: "relative" }}>
      <VirtualFocus.Anchor
        role="combobox"
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
      onActive={() => {
        setValue(children);
        console.log(`onActive(): ${children}`);
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

const StoryStyle = () => (
  <style>
    {`
    [data-aksel-virtualfocus="true"] {
      outline: solid 3px var(--ax-border-focus);
      border-radius: var(--ax-radius-4);
    }
    `}
  </style>
);

export const Default = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <StoryStyle />
      <VirtualFocus>
        <MyAnchor setValue={setValue} value={value}>
          <VirtualFocus.Content>
            <VStack>
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
              <MyItem
                setValue={setValue}
                icon={<PuzzlePieceIcon aria-hidden />}
              >
                {"puzzle piece "}
              </MyItem>
            </VStack>
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
      <StoryStyle />
      <VirtualFocus loop>
        <MyAnchor setValue={setValue} value={value}>
          <VirtualFocus.Content>
            <VStack>
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
              <MyItem
                setValue={setValue}
                icon={<PuzzlePieceIcon aria-hidden />}
              >
                {"puzzle piece "}
              </MyItem>
            </VStack>
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
      <StoryStyle />
      <VirtualFocus>
        <MyAnchor setValue={setValue} value={value}>
          <VirtualFocus.Content>
            <VStack>
              <MyItem setValue={setValue} icon={<CloudIcon aria-hidden />}>
                {"cloud "}
              </MyItem>
              <MyItem setValue={setValue} icon={<HangerIcon aria-hidden />}>
                {"hanger "}
              </MyItem>
            </VStack>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
      <VirtualFocus>
        <MyAnchor setValue={setValue2} value={value2}>
          <VirtualFocus.Content>
            <VStack>
              <MyItem setValue={setValue2} icon={<CloudIcon aria-hidden />}>
                {"cloud "}
              </MyItem>
              <MyItem setValue={setValue2} icon={<HangerIcon aria-hidden />}>
                {"hanger "}
              </MyItem>
            </VStack>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
      <VirtualFocus>
        <MyAnchor setValue={setValue3} value={value3}>
          <VirtualFocus.Content>
            <VStack>
              <MyItem setValue={setValue3} icon={<CloudIcon aria-hidden />}>
                {"cloud "}
              </MyItem>
              <MyItem setValue={setValue3} icon={<HangerIcon aria-hidden />}>
                {"hanger "}
              </MyItem>
            </VStack>
          </VirtualFocus.Content>
        </MyAnchor>
      </VirtualFocus>
    </>
  );
};

const MyDropDownSearchVirtualfocus = () => {
  const anchorRef = useRef<HTMLInputElement>(null);
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

  const filteredItems = items;

  return (
    <>
      <style>
        {`
        .dropdown-search-virtualfocus {
          width: 100%;
        }
        [data-aksel-virtualfocus="true"] {
          outline: solid 3px var(--ax-border-focus);
          border-radius: var(--ax-radius-4);
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
          offset={0}
          placement="bottom-start"
        >
          <VirtualFocus.Content>
            <Popover.Content>
              <VStack>
                {filteredItems.map((i) => {
                  return (
                    <MyItem setValue={setValue} key={i.text} icon={i.icon}>
                      {i.text}
                    </MyItem>
                  );
                })}
              </VStack>
            </Popover.Content>
          </VirtualFocus.Content>
        </Popover>
      </MyAnchor>
    </>
  );
};

export const WithPopover = () => {
  return (
    <div>
      <VirtualFocus>
        <MyDropDownSearchVirtualfocus />
      </VirtualFocus>
    </div>
  );
};

/**
 * A simple story without much interactivity (very much incomplete
 * but shows a good overview of the components & their relationship)
 * This is essentially 1:1 with the JSDoc example for the component.
 **/
export const Simple = () => {
  return (
    <>
      <StoryStyle />
      <VirtualFocus>
        <VirtualFocus.Anchor
          role="combobox"
          onSelect={() => {
            console.log("you selected the anchor");
          }}
          onActive={() => {
            console.log("the anchor is now virtually focused");
          }}
        >
          <input type="text" />
        </VirtualFocus.Anchor>
        <VirtualFocus.Content>
          <VirtualFocus.Item
            onSelect={() => {
              console.log("you selected the item");
            }}
            onActive={() => {
              console.log("the item is now virtually focused");
            }}
          >
            <p>item 1</p>
          </VirtualFocus.Item>
          <VirtualFocus.Item
            onSelect={() => {
              console.log("you selected the item");
            }}
            onActive={() => {
              console.log("the item is now virtually focused");
            }}
          >
            <p>item 2</p>
          </VirtualFocus.Item>
        </VirtualFocus.Content>
      </VirtualFocus>
    </>
  );
};
