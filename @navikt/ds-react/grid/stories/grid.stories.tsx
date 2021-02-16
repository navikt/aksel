import * as React from "react";
import { Grid, Cell } from "../src/index";
import { ContentContainer } from "../../content-container/src";
import "./styles.css";

export default {
  title: "@navikt/grid",
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
        <Cell className={"navds-story-cell"} sm={12} md={6} xl={4}>
          Kolonne
        </Cell>
        <Cell className={"navds-story-cell"} sm={12} md={6} xl={4}>
          Kolonne
        </Cell>
        <Cell className={"navds-story-cell"} sm={12} md={12} xl={4}>
          Kolonne
        </Cell>
      </Grid>
    </ContentContainer>
  );
};
