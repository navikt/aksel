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
        <Cell sm={12} xl={4}>
          Kolonne
        </Cell>
        <Cell sm={12} xl={4}>
          Kolonne
        </Cell>
        <Cell sm={12} xl={4}>
          Kolonne
        </Cell>
      </Grid>
    </Container>
  </div>
);
