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
        <Cell sm={4} md={8} lg={3}>
          Kolonne
        </Cell>
        <Cell sm={4} md={4} lg={6}>
          Kolonne
        </Cell>
        <Cell sm={4} md={4} lg={3}>
          Kolonne
        </Cell>
      </Grid>
    </Container>
  </div>
);
