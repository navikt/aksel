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
import { Popover } from "../../popover";
import { Search } from "../search";
import { VirtualFocus, useVirtualFocusDescendants } from "./VirtualFocus";
import { set_virtual_focus } from "./utils";

export default {
  title: "Utilities/VirtualFocus",
  component: VirtualFocus,
} as Meta;

const MyAnchor = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
  }
>(({ children, value, setValue }, ref) => {
  const descendants = useVirtualFocusDescendants();
  const [virtualFocusIdx, setVirtualFocusIdx] = useState(0);

  const to_blur = descendants.item(virtualFocusIdx);
  const to_focus = descendants.item(0);

  return (
    <div style={{ position: "relative" }}>
      <VirtualFocus.Anchor
        ref={ref}
        pick={() => {
          console.log(`pick(): searching for ${value}`);
        }}
        onActive={() => {
          setValue(" ");
        }}
      >
        <Search
          label="Søk på nav sine sider"
          autoComplete="off"
          value={value}
          onChange={(current_input) => {
            console.log({ current_input });
            setValue(current_input);
            if (to_focus?.node) {
              set_virtual_focus(to_focus.node, to_blur?.node);
            }
            setVirtualFocusIdx(0);
          }}
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
  const [value, setValue] = useState("");

  return (
    <>
      <style>{`
.navds-virtualfocus-item[data-aksel-virtualfocus="true"] {
  outline: solid 3px var(--a-border-focus);
  border-radius: var(--a-border-radius-medium);
}
`}</style>
      <VirtualFocus>
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

export const NoLoop = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <style>{`
.navds-virtualfocus-item[data-aksel-virtualfocus="true"] {
  outline: solid 3px var(--a-border-focus);
  border-radius: var(--a-border-radius-medium);
}
`}</style>
      <VirtualFocus loop={false}>
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
.navds-virtualfocus-item[data-aksel-virtualfocus="true"] {
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
      <VirtualFocus>
        <MyDropDownSearchVirtualfocus />
      </VirtualFocus>
    </div>
  );
};
