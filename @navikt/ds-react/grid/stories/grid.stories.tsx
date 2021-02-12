import * as React from "react";
import { Grid, Cell } from "../src/index";
import Container from "../../content-container/src";
import "./styles.css";

export default {
  title: "@navikt/grid",
  component: { Container, Grid, Cell },
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
    <Container>
      <Grid>
        <Cell className={"navds-story-cell"} small={12} medium={6} xLarge={4}>
          Kolonne
        </Cell>
        <Cell className={"navds-story-cell"} small={12} medium={6} xLarge={4}>
          Kolonne
        </Cell>
        <Cell className={"navds-story-cell"} small={12} medium={12} xLarge={4}>
          Kolonne
        </Cell>
      </Grid>
    </Container>
  );
};
