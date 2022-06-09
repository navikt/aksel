import React from "react";
import { SpeechBubble } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Illustration } from "./illustration";

export default {
  title: "ds-react/speechbubble",
  component: SpeechBubble,
} as Meta;

export const All = () => {
  return (
    <div style={{ rowGap: "2rem", display: "flex", flexDirection: "column" }}>
      <SpeechBubble
        illustration={<Illustration />}
        sender="Ola Normann"
        timestamp="01.01.21 14:00"
        backgroundColor="var(--navds-global-color-lightblue-200)"
      >
        <SpeechBubble.Chat>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Chat>
        <SpeechBubble.Chat>
          Tempor fugiat amet eu sint in in ullamco.
        </SpeechBubble.Chat>
        <SpeechBubble.Chat>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </SpeechBubble.Chat>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        sender="Ola Normann"
        timestamp="01.01.21 14:00"
        position="right"
        backgroundColor="var(--navds-global-color-gray-100)"
      >
        <SpeechBubble.Chat>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Chat>
        <SpeechBubble.Chat>
          Tempor fugiat amet eu sint in in ullamco.
        </SpeechBubble.Chat>
        <SpeechBubble.Chat>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </SpeechBubble.Chat>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        sender="Ola Normann"
        timestamp="01.01.21 14:00"
        position="left"
      >
        <SpeechBubble.Chat>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Chat>
        <SpeechBubble.Chat>
          Tempor fugiat amet eu sint in in ullamco.
        </SpeechBubble.Chat>
        <SpeechBubble.Chat>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </SpeechBubble.Chat>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        sender="Ola Normann"
        timestamp="01.01.21 14:00"
        position="right"
      >
        <SpeechBubble.Chat>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Chat>
        <SpeechBubble.Chat>
          Tempor fugiat amet eu sint in in ullamco.
        </SpeechBubble.Chat>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        sender="Ola Normann"
        timestamp="01.01.21 14:00"
        position="left"
      >
        <SpeechBubble.Chat>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Chat>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        sender="Ola Normann"
        timestamp="01.01.21 14:00"
        position="right"
      >
        <SpeechBubble.Chat>Per skriver....</SpeechBubble.Chat>
      </SpeechBubble>
    </div>
  );
};
