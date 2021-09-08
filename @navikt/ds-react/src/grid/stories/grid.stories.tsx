import * as React from "react";
import { BodyLong } from "../..";
import { Grid, Cell, ContentContainer } from "../index";
import "./styles.css";

export default {
  title: "ds-react/grid",
  component: { Grid, Cell },
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "NAV gray",
      values: [
        {
          name: "white",
          value: "#ffffff",
        },
        {
          name: "NAV gray",
          value: "#f1f1f1",
        },
      ],
    },
  },
};

export const All = () => {
  return (
    <ContentContainer>
      <Grid>
        <Cell className={"navds-story-cell"} xs={12} sm={6} lg={4}>
          Kolonne
        </Cell>
        <Cell className={"navds-story-cell"} xs={12} sm={6} lg={4}>
          Kolonne
        </Cell>
        <Cell className={"navds-story-cell"} xs={12} sm={12} lg={4}>
          Kolonne
        </Cell>
      </Grid>
    </ContentContainer>
  );
};

export const Contentcontainer = () => {
  return (
    <ContentContainer className={"navds-story-content-container"}>
      <BodyLong size="medium">-- Innhold --</BodyLong>
    </ContentContainer>
  );
};
