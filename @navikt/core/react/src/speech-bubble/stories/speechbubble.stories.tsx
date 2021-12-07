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
        topText="Ola Normann 01.01.21 14:00"
        backgroundColor="var(--navds-global-color-lightblue-200)"
      >
        <SpeechBubble.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Bubble>
        <SpeechBubble.Bubble>
          Tempor fugiat amet eu sint in in ullamco.
        </SpeechBubble.Bubble>
        <SpeechBubble.Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </SpeechBubble.Bubble>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        topText={
          <div
            style={{
              columnGap: "1rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span>Ola Normann</span>
            <span className="navds-detail--s">01.01.21 14:00</span>
          </div>
        }
        position="right"
        backgroundColor="var(--navds-global-color-gray-100)"
      >
        <SpeechBubble.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Bubble>
        <SpeechBubble.Bubble>
          Tempor fugiat amet eu sint in in ullamco.
        </SpeechBubble.Bubble>
        <SpeechBubble.Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </SpeechBubble.Bubble>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        topText="Ola Normann 01.01.21 14:00"
        position="left"
      >
        <SpeechBubble.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Bubble>
        <SpeechBubble.Bubble>
          Tempor fugiat amet eu sint in in ullamco.
        </SpeechBubble.Bubble>
        <SpeechBubble.Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </SpeechBubble.Bubble>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        topText="Ola Normann 01.01.21 14:00"
        position="right"
      >
        <SpeechBubble.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Bubble>
        <SpeechBubble.Bubble>
          Tempor fugiat amet eu sint in in ullamco.
        </SpeechBubble.Bubble>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        topText="Ola Normann 01.01.21 14:00"
        position="left"
      >
        <SpeechBubble.Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </SpeechBubble.Bubble>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        topText="Ola Normann 01.01.21 14:00"
        position="right"
      >
        <SpeechBubble.Bubble>Per skriver....</SpeechBubble.Bubble>
      </SpeechBubble>
    </div>
  );
};
