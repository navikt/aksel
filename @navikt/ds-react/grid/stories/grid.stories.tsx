import React from "react";
import { Container, Grid, Cell } from "../src/index";

export default {
  title: "@navikt/grid",
  component: { Container, Grid, Cell },
};

export const All = () => {
  return (
    <Container style={styles.container}>
      <Grid>
        <Cell style={styles.cell} sm={6} xl={4}>
          Kolonne
        </Cell>
        <Cell style={styles.cell} sm={6} xl={4}>
          Kolonne
        </Cell>
        <Cell style={styles.cell} sm={12} xl={4}>
          Kolonne
        </Cell>
      </Grid>
    </Container>
  );
};

const styles = {
  container: { background: "rgba(0, 0, 0, 0.2)" },
  cell: { background: "rgba(0, 0, 0, 0.2)" },
};
