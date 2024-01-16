import {
  Chat as DsChat,
  Button,
} from "@navikt/ds-react";

export const Demo = () => (
  <DsChat avatar="ON" name="Ola Normann" backgroundColor="#321" timestamp="01.01.21 14:00" avatarBgColor="#123" >
    <DsChat.Bubble>
      Aute minim nisi sunt mollit duis sunt nulla minim non proident.
    </DsChat.Bubble>
    <DsChat.Bubble backgroundColor="#fff">Tempor fugiat amet eu sint in in ullamco.</DsChat.Bubble>
    <DsChat.Bubble backgroundColor="#111">
      Adipisicing laborum est eu laborum est sit in commodo enim sint laboris
      labore nisi ut.
    </DsChat.Bubble>
  </DsChat>
);
