/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Menu, MenuHeading, MenuList, MenuListItem } from "./Menu";

const meta = {
  title: "Website-modules/Menu",
  component: Menu,
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MenuDemo: Story = {
  render: () => {
    const [selected, setSelected] = useState(0);
    return (
      <Menu loggingContext="meny" variant="sidebar">
        <>
          <MenuHeading as="div">Primitives</MenuHeading>
          <ul onClick={() => setSelected((x) => (x === 0 ? 1 : 0))}>
            <MenuListItem href="#">Bleed</MenuListItem>
            <MenuListItem href="#">Box</MenuListItem>
            <MenuListItem href="#" selected={selected === 1}>
              HGrid
            </MenuListItem>
            <MenuListItem href="#">Hide</MenuListItem>
            <MenuListItem href="#" selected={selected === 0}>
              HStack
            </MenuListItem>
            <MenuListItem href="#">Show</MenuListItem>
            <MenuListItem href="#">VStack</MenuListItem>
          </ul>
        </>
      </Menu>
    );
  },
  args: {
    children: null,
    loggingContext: "meny",
    variant: "sidebar",
  },
};

export const NestedMenuDemo: Story = {
  render: () => {
    return (
      <Menu loggingContext="toc" variant="toc">
        <MenuHeading as="h2">Innhold på siden</MenuHeading>
        <MenuList>
          <MenuListItem href="#" selected>
            Så, hvordan går vi frem for å få det til?
          </MenuListItem>
          <MenuListItem href="#">Bærekraftige team</MenuListItem>
          <MenuList>
            <MenuListItem href="#">Teamstørrelse</MenuListItem>
            <MenuListItem href="#">Stabilitet Vs. fleksibilitet</MenuListItem>
            <MenuListItem href="#" selected>
              Myndighet og hensikt
            </MenuListItem>
            <MenuListItem href="#">
              Ansvar tilpasset kognitiv kapasitet
            </MenuListItem>
          </MenuList>
          <MenuListItem href="#">Teamtyper</MenuListItem>
        </MenuList>
      </Menu>
    );
  },
  args: {
    children: null,
    loggingContext: "toc",
    variant: "toc",
  },
};
