import React from "react";
import { Container, Grid, Cell } from "../src/index";

export default {
  title: "@navikt/grid",
  component: { Container, Grid, Cell },
};

export const All = () => (
  <div>
    <Container>
      <Grid>
        <Cell small={4} medium={2}>
          Kolonne
        </Cell>
        <Cell small={4} medium={4}>
          Kolonne
        </Cell>
        <Cell small={4} medium={6}>
          Kolonne
        </Cell>
      </Grid>
    </Container>
  </div>
);
