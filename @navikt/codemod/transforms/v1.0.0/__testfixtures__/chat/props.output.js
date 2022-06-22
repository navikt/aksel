import { Chat, Button } from "@navikt/ds-react";
/* eslint-disable react/jsx-no-undef */
export const Page = () => {
  return (
    <div>
      <Chat
        avatar={<Illustration />}
        name="Ola Normann 01.01.21 14:00"
        backgroundColor="red"
        avatarBgColor="blue"
      >
        <Chat.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </Chat.Bubble>
        <Chat.Bubble>
          Eu fugiat esse fugiat Lorem culpa nulla mollit tempor incididunt aute
          do.
        </Chat.Bubble>
        <Chat.Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </Chat.Bubble>
      </Chat>
      <Chat
        avatar={<Illustration />}
        name="Ola Normann 01.01.21 14:00"
        backgroundColor="red"
        avatarBgColor="blue"
      >
        <Chat.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </Chat.Bubble>
        <Chat.Bubble>
          Eu fugiat esse fugiat Lorem culpa nulla mollit tempor incididunt aute
          do.
        </Chat.Bubble>
        <Chat.Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </Chat.Bubble>
      </Chat>
    </div>
  );
};
