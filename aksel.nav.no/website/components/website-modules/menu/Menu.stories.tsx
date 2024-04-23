/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Menu, MenuHeading, MenuLi, MenuLink, MenuUl } from "./Menu";

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
      <Menu loggingContext="meny" variant="action">
        <>
          <MenuHeading as="div">Primitives</MenuHeading>
          <ul onClick={() => setSelected((x) => (x === 0 ? 1 : 0))}>
            <MenuLi>
              <MenuLink href="#">Bleed</MenuLink>
            </MenuLi>
            <MenuLi>
              <MenuLink href="#">Box</MenuLink>
            </MenuLi>
            <MenuLi>
              <MenuLink href="#" selected={selected === 1}>
                HGrid
              </MenuLink>
            </MenuLi>
            <MenuLi>
              <MenuLink href="#">Hide</MenuLink>
            </MenuLi>
            <MenuLi>
              <MenuLink href="#" selected={selected === 0}>
                HStack
              </MenuLink>
            </MenuLi>
            <MenuLi>
              <MenuLink href="#">Show</MenuLink>
            </MenuLi>
            <MenuLi>
              <MenuLink href="#" selected>
                VStack
              </MenuLink>
            </MenuLi>
          </ul>
        </>
      </Menu>
    );
  },
  args: {
    children: null,
    loggingContext: "meny",
    variant: "action",
  },
};

export const NestedMenuDemo: Story = {
  render: () => {
    return (
      <Menu loggingContext="toc" variant="neutral">
        <MenuHeading as="h2">Innhold på siden</MenuHeading>
        <MenuUl>
          <MenuLi>
            <MenuLink href="#" selected>
              Så, hvordan går vi frem for å få det til?
            </MenuLink>
          </MenuLi>
          <MenuLi>
            <MenuLink href="#">Bærekraftige team</MenuLink>
          </MenuLi>

          <MenuLi>
            <MenuUl>
              <MenuLi>
                <MenuLink href="#">Teamstørrelse</MenuLink>
              </MenuLi>
              <MenuLi>
                <MenuLink href="#">Stabilitet Vs. fleksibilitet</MenuLink>
              </MenuLi>
              <MenuLi>
                <MenuLink href="#" selected>
                  Myndighet og hensikt
                </MenuLink>
              </MenuLi>
              <MenuLi>
                <MenuLink href="#">
                  Ansvar tilpasset kognitiv kapasitet
                </MenuLink>
              </MenuLi>
            </MenuUl>
          </MenuLi>
          <MenuLi>
            <MenuLink href="#" selected>
              Teamtyper
            </MenuLink>
          </MenuLi>
        </MenuUl>
      </Menu>
    );
  },
  args: {
    children: null,
    loggingContext: "toc",
    variant: "neutral",
  },
};
