import * as React from "react";
import { Container, Grid, Cell } from "../src/index";
import ContentContainer from "../../page-container/src";

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
    <ContentContainer>
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
    </ContentContainer>
  );
};
