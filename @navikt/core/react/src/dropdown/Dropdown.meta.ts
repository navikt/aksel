import type { ComponentMetadata } from "../utils/types/metadata";
import {
  Dropdown,
  DropdownMenu,
  DropdownMenuDivider,
  DropdownMenuGroupedList,
  DropdownMenuGroupedListHeading,
  DropdownMenuGroupedListItem,
  DropdownMenuList,
  DropdownMenuListItem,
  DropdownToggle,
} from "./index";

const metadata: ComponentMetadata = {
  name: "Dropdown",
  components: {
    Dropdown,
    "Dropdown.Toggle": DropdownToggle,
    "Dropdown.Menu": DropdownMenu,
    "Dropdown.Menu.Divider": DropdownMenuDivider,
    "Dropdown.Menu.List": DropdownMenuList,
    "Dropdown.Menu.List.Item": DropdownMenuListItem,
    "Dropdown.Menu.GroupedList": DropdownMenuGroupedList,
    "Dropdown.Menu.GroupedList.Item": DropdownMenuGroupedListItem,
    "Dropdown.Menu.GroupedList.Heading": DropdownMenuGroupedListHeading,
  },
  keywords: ["dropdown", "menu", "meny", "overflow", "context"],
  related: ["ActionMenu"],
};

export { metadata };
