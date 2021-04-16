import * as React from "react";
import { ContentContainer } from "../index";
import { Text } from "../../index";
import "./style.css";
import { useEffect } from "react";

export default {
  title: "ds-react/content-container",
  component: ContentContainer,
  decorators: [
    (Story) => {
      useEffect(() => {
        document.getElementById("decorator-header").style.display = "block";
        document.getElementById("decorator-footer").style.display = "block";
        return () => {
          document.getElementById("decorator-header").style.display = "none";
          document.getElementById("decorator-footer").style.display = "none";
        };
      }, []);
      return <Story />;
    },
  ],
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
      <Text size="medium">-- Innhold --</Text>
    </ContentContainer>
  );
};
