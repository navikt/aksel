import type { ComponentMetadata } from "../utils/types/metadata";
import {
  InternalHeader,
  InternalHeaderButton,
  InternalHeaderTitle,
  InternalHeaderUser,
  InternalHeaderUserButton,
} from "./index";

const metadata: ComponentMetadata = {
  name: "InternalHeader",
  components: {
    InternalHeader,
    "InternalHeader.Title": InternalHeaderTitle,
    "InternalHeader.Button": InternalHeaderButton,
    "InternalHeader.User": InternalHeaderUser,
    "InternalHeader.UserButton": InternalHeaderUserButton,
  },
  keywords: ["internal header", "header", "meny", "navigation", "topbar"],
};

export { metadata };
