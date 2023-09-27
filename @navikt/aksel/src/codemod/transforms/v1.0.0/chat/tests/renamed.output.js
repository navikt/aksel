import { Chat as DsBubble, Button } from "@navikt/ds-react";
/* eslint-disable react/jsx-no-undef */
export const Page = () => {
  return (
    <div>
      <DsBubble
        avatar={<Illustration />}
        name="Ola Normann 01.01.21 14:00"
        backgroundColor="red"
        avatarBgColor="blue"
      >
        <DsBubble.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </DsBubble.Bubble>
        <DsBubble.Bubble>
          Eu fugiat esse fugiat Lorem culpa nulla mollit tempor incididunt aute
          do.
        </DsBubble.Bubble>
        <DsBubble.Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </DsBubble.Bubble>
      </DsBubble>
      <DsBubble
        avatar={<Illustration />}
        name="Ola Normann 01.01.21 14:00"
        backgroundColor="red"
        avatarBgColor="blue"
      >
        <DsBubble.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </DsBubble.Bubble>
        <DsBubble.Bubble>
          Eu fugiat esse fugiat Lorem culpa nulla mollit tempor incididunt aute
          do.
        </DsBubble.Bubble>
        <DsBubble.Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </DsBubble.Bubble>
      </DsBubble>
    </div>
  );
};
