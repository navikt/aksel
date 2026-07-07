import type { ComponentMetadata } from "../utils/types/metadata";
import {
  ActionMenu,
  ActionMenuCheckboxItem,
  ActionMenuContent,
  ActionMenuDivider,
  ActionMenuGroup,
  ActionMenuItem,
  ActionMenuLabel,
  ActionMenuRadioGroup,
  ActionMenuRadioItem,
  ActionMenuSub,
  ActionMenuSubContent,
  ActionMenuSubTrigger,
  ActionMenuTrigger,
} from "./index";

const metadata: ComponentMetadata = {
  name: "ActionMenu",
  components: {
    ActionMenu,
    "ActionMenu.Trigger": ActionMenuTrigger,
    "ActionMenu.Content": ActionMenuContent,
    "ActionMenu.Group": ActionMenuGroup,
    "ActionMenu.Label": ActionMenuLabel,
    "ActionMenu.Item": ActionMenuItem,
    "ActionMenu.CheckboxItem": ActionMenuCheckboxItem,
    "ActionMenu.RadioGroup": ActionMenuRadioGroup,
    "ActionMenu.RadioItem": ActionMenuRadioItem,
    "ActionMenu.Divider": ActionMenuDivider,
    "ActionMenu.Sub": ActionMenuSub,
    "ActionMenu.SubTrigger": ActionMenuSubTrigger,
    "ActionMenu.SubContent": ActionMenuSubContent,
  },
  keywords: ["action menu", "meny", "menu", "context menu", "dropdown"],
  related: ["Dropdown"],
};

export { metadata };
