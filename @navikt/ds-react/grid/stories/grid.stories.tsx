import React from "react";
import { Container, Grid, Cell } from "../src/index";

export default {
  title: "@navikt/grid",
  component: { Container, Grid, Cell },
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "white",
      values: [
        {
          name: "white",
          value: "#ffffff",
        },
        {
          name: "nav gray",
          value: "#f1f1f1",
        },
      ],
    },
  },
};

export const All = () => (
  <Container>
    <Grid>
      <Cell sm={4} md={8} lg={3} white padding>
        Kolonne
      </Cell>
      <Cell sm={4} md={4} lg={6} white padding>
        Kolonne
      </Cell>
      <Cell sm={4} md={4} lg={3} white padding>
        Kolonne
      </Cell>
    </Grid>
  </Container>
);
