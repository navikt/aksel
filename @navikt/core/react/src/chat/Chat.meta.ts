import type { ComponentMetadata } from "../utils/types/metadata";
import { Chat, ChatBubble } from "./index";

const metadata: ComponentMetadata = {
  name: "Chat",
  components: {
    Chat,
    "Chat.Bubble": ChatBubble,
  },
  keywords: ["chat", "melding", "message", "conversation", "bubble"],
};

export { metadata };
