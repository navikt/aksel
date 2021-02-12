import * as React from "react";
import ContentContainer from "../src/index";
import "./style.css";

export default {
  title: "@navikt/page-container",
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
      -- Innhold --
    </ContentContainer>
  );
};
