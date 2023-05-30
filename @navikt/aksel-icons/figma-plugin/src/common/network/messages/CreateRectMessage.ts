/* eslint-disable no-undef */
import { NetworkSide } from "@common/network/sides";
import * as Networker from "monorepo-networker";

interface Payload {
  width: number;
  height: number;
}

export class CreateRectMessage extends Networker.MessageType<Payload> {
  public receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  public handle(payload: Payload, from: Networker.Side): void {
    // @ts-ignore
    if (figma.editorType === "figma") {
      // @ts-ignore
      const rect = figma.createRectangle();
      rect.x = 0;
      rect.y = 0;
      rect.name = "Plugin Rectangle # " + Math.floor(Math.random() * 9999);
      rect.fills = [
        {
          type: "SOLID",
          color: {
            r: Math.random(),
            g: Math.random(),
            b: Math.random(),
          },
        },
      ];
      rect.resize(payload.width, payload.height);
      // @ts-ignore
      figma.currentPage.appendChild(rect);
      // @ts-ignore
      figma.viewport.scrollAndZoomIntoView([rect]);
      // @ts-ignore
      figma.closePlugin();
    }
  }
}
