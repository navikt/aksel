import { Meta, StoryObj } from "@storybook/react";
import { Menu, MenuHeading, MenuListItem } from "./Menu";

const meta = {
  title: "Website-modules/Menu",
  component: Menu,
  tags: ["autodocs"],
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MenuDemo: Story = {
  render: (props) => <Menu {...props} />,
  args: {
    children: (
      <>
        <MenuHeading>Primitives</MenuHeading>
        <ul>
          <MenuListItem href="#">Bleed</MenuListItem>
          <MenuListItem href="#">Box</MenuListItem>
          <MenuListItem href="#">HGrid</MenuListItem>
          <MenuListItem href="#">Hide</MenuListItem>
          <MenuListItem href="#" selected>
            HStack
          </MenuListItem>
          <MenuListItem href="#">Show</MenuListItem>
          <MenuListItem href="#">VStack</MenuListItem>
        </ul>
      </>
    ),
  },
};
