import * as React from "react";
import { ContentContainer } from "../index";
import { BodyLong } from "../../index";
import "./style.css";

export default {
  title: "ds-react/content-container",
  component: ContentContainer,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "NAV gray",
      values: [
        {
          name: "NAV gray",
          value: "#f1f1f1",
        },
        {
          name: "white",
          value: "#ffffff",
        },
      ],
    },
  },
};

export const All = () => {
  return (
    <ContentContainer className={"navds-story-content-container"}>
      <BodyLong size="m">-- Innhold --</BodyLong>
    </ContentContainer>
  );
};
