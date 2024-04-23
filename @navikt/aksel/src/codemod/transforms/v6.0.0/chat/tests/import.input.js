import {
  Chat,
  Button,
} from "@navikt/ds-react";

export const Demo = () => (
  <Chat avatar="ON" name="Ola Normann" backgroundColor="#321" timestamp="01.01.21 14:00" avatarBgColor="#123" >
    <Chat.Bubble>
      Aute minim nisi sunt mollit duis sunt nulla minim non proident.
    </Chat.Bubble>
    <Chat.Bubble backgroundColor="#fff">Tempor fugiat amet eu sint in in ullamco.</Chat.Bubble>
    <Chat.Bubble backgroundColor="#111">
      Adipisicing laborum est eu laborum est sit in commodo enim sint laboris
      labore nisi ut.
    </Chat.Bubble>
  </Chat>
);
