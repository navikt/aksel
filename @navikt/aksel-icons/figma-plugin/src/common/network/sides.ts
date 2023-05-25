/* eslint-disable no-undef */
import * as Networker from "monorepo-networker";

export namespace NetworkSide {
  export const PLUGIN = Networker.Side.register(
    new Networker.Side<MessageEvent<any>>("Plugin", {
      // @ts-ignore
      attachListener: (callback) => figma.ui.on("message", callback),
      // @ts-ignore
      detachListener: (callback) => figma.ui.off("message", callback),
    })
  );

  export const UI = Networker.Side.register(
    new Networker.Side("UI", {
      shouldHandle: (event) => event.data?.pluginId != null,
      messageGetter: (event) => event.data.pluginMessage,
      attachListener: (callback) =>
        window.addEventListener("message", callback),
      detachListener: (callback) =>
        window.removeEventListener("message", callback),
    })
  );
}
