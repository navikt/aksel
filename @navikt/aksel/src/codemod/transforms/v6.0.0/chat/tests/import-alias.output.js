import {
  Chat as DsChat,
  Button,
} from "@navikt/ds-react";

export const Demo = () => (
  <DsChat avatar="ON" name="Ola Normann" timestamp="01.01.21 14:00">
    <DsChat.Bubble>
      Aute minim nisi sunt mollit duis sunt nulla minim non proident.
    </DsChat.Bubble>
    <DsChat.Bubble>Tempor fugiat amet eu sint in in ullamco.</DsChat.Bubble>
    <DsChat.Bubble>
      Adipisicing laborum est eu laborum est sit in commodo enim sint laboris
      labore nisi ut.
    </DsChat.Bubble>
  </DsChat>
);
