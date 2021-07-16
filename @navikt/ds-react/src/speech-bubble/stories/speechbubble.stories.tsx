import React from "react";
import { SpeechBubble, Bubble } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/speechbubble",
  component: SpeechBubble,
  subcomponents: { Bubble },
} as Meta;

export const All = () => {
  return (
    <div>
      <SpeechBubble topText="Ola Normann 01.01.21 14:00">
        <Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </Bubble>
        <Bubble>Tempor fugiat amet eu sint in in ullamco.</Bubble>
        <Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </Bubble>
      </SpeechBubble>
    </div>
  );
};
