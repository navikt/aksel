import React from "react";
import { SpeechBubble, Bubble } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import { Illustration } from "./illustration";

export default {
  title: "ds-react/speechbubble",
  component: SpeechBubble,
  subcomponents: { Bubble },
} as Meta;

export const All = () => {
  return (
    <div style={{ rowGap: "2rem", display: "flex", flexDirection: "column" }}>
      <SpeechBubble
        illustration={<Illustration />}
        topText="Ola Normann 01.01.21 14:00"
        backgroundColor="var(--navds-color-lightblue-20)"
      >
        <Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </Bubble>
        <Bubble>Tempor fugiat amet eu sint in in ullamco.</Bubble>
        <Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </Bubble>
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
        backgroundColor="var(--navds-color-gray-10)"
      >
        <Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </Bubble>
        <Bubble>Tempor fugiat amet eu sint in in ullamco.</Bubble>
        <Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </Bubble>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        topText="Ola Normann 01.01.21 14:00"
        position="left"
      >
        <Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </Bubble>
        <Bubble>Tempor fugiat amet eu sint in in ullamco.</Bubble>
        <Bubble>
          Adipisicing laborum est eu laborum est sit in commodo enim sint
          laboris labore nisi ut.
        </Bubble>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        topText="Ola Normann 01.01.21 14:00"
        position="right"
      >
        <Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </Bubble>
        <Bubble>Tempor fugiat amet eu sint in in ullamco.</Bubble>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        topText="Ola Normann 01.01.21 14:00"
        position="left"
      >
        <Bubble>
          Aute minim nisi sunt mollit duis sunt nulla minim non proident.
        </Bubble>
      </SpeechBubble>
      <SpeechBubble
        illustration={<div>KAJ</div>}
        topText="Ola Normann 01.01.21 14:00"
        position="right"
      >
        <Bubble>Per skriver....</Bubble>
      </SpeechBubble>
    </div>
  );
};
