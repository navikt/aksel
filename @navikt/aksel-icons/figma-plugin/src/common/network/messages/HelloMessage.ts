import * as Networker from "monorepo-networker";

interface Payload {
  text: string;
}

export class HelloMessage extends Networker.MessageType<Payload> {
  constructor(private side: Networker.Side) {
    super("hello-" + side.getName());
  }

  receivingSide(): Networker.Side {
    return this.side;
  }

  handle(payload: Payload, from: Networker.Side) {
    console.log(`${from.getName()} said "${payload.text}"`);
  }
}
