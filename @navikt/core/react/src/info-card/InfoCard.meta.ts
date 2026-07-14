import type { ComponentMetadata } from "../utils/types/metadata";
import {
  InfoCard,
  InfoCardContent,
  InfoCardHeader,
  InfoCardMessage,
  InfoCardTitle,
} from "./index";

const metadata: ComponentMetadata = {
  name: "InfoCard",
  components: {
    InfoCard,
    "InfoCard.Header": InfoCardHeader,
    "InfoCard.Title": InfoCardTitle,
    "InfoCard.Content": InfoCardContent,
    "InfoCard.Message": InfoCardMessage,
  },
  keywords: ["info card", "infokort", "card", "information", "message"],
  related: ["Alert"],
};

export { metadata };
