import type { ComponentMetadata } from "../utils/types/metadata";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardIcon,
  LinkCardImage,
  LinkCardTitle,
} from "./index";

const metadata: ComponentMetadata = {
  name: "LinkCard",
  components: {
    LinkCard,
    "LinkCard.Title": LinkCardTitle,
    "LinkCard.Description": LinkCardDescription,
    "LinkCard.Icon": LinkCardIcon,
    "LinkCard.Image": LinkCardImage,
    "LinkCard.Anchor": LinkCardAnchor,
    "LinkCard.Footer": LinkCardFooter,
  },
  keywords: ["link card", "lenkekort", "card", "kort", "navigation"],
  related: ["LinkPanel", "Link"],
};

export { metadata };
