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
        <Cell small={4} medium={8} large={12}>
          Kolonne
        </Cell>
        <Cell small={4} medium={4} large={12}>
          Kolonne
        </Cell>
        <Cell small={4} medium={4} large={12}>
          Kolonne
        </Cell>
      </Grid>
    </Container>
  </div>
);
