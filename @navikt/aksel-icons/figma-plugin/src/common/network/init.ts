/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import * as Networker from "monorepo-networker";
import { NetworkMessages } from "@common/network/messages";
import { NetworkSide } from "@common/network/sides";

export const initializeNetwork = Networker.createInitializer({
  messagesRegistry: NetworkMessages.registry,

  initTransports: function (register) {
    register(NetworkSide.PLUGIN, NetworkSide.UI, (message) => {
      // @ts-ignore
      figma.ui.postMessage(message);
    });

    register(NetworkSide.UI, NetworkSide.PLUGIN, (message) => {
      // @ts-ignore
      parent.postMessage({ pluginMessage: message }, "*");
    });
  },
});
