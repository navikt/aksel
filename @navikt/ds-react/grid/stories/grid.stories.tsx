import * as React from "react";
import { Grid, Cell } from "../src/index";
import Container from "../../content-container/src";

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

export const All = () => {
  return (
    <Container>
      <Grid>
        <Cell sm={12} md={6} xl={4} white padding>
          Kolonne
        </Cell>
        <Cell sm={12} md={6} xl={4} white padding>
          Kolonne
        </Cell>
        <Cell sm={12} md={12} xl={4} white padding>
          Kolonne
        </Cell>
      </Grid>
    </Container>
  );
};
