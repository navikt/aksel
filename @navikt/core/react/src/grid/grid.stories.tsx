import * as React from "react";
import { BodyLong, Grid, Cell, ContentContainer } from "../index";

export default {
  title: "ds-react/Grid",
  component: { Grid, Cell },
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => {
  return (
    <>
      <ContentContainer>
        <span>
          Grid har ikke blitt oppdatert siden 2020 og vil på sikt få større
          endringer eller deprecates. Vi anbefaler derfor å ikke ta vår
          grid-løsning i bruk for nå.
        </span>
        <Grid>
          <Cell className="cell" xs={12} sm={6} lg={4}>
            Kolonne
          </Cell>
          <Cell className="cell" xs={12} sm={6} lg={4}>
            Kolonne
          </Cell>
          <Cell className="cell" xs={12} sm={12} lg={4}>
            Kolonne
          </Cell>
        </Grid>
        <style>{`.cell {padding: 1rem; background: repeating-linear-gradient(
    45deg,
    #d6d6d6,
    #d6d6d6 10px,
    transparent 10px,
    transparent 20px
  );}`}</style>
      </ContentContainer>
    </>
  );
};

export const Contentcontainer = () => {
  return (
    <>
      <ContentContainer className="container">
        <BodyLong size="medium">-- Innhold --</BodyLong>
      </ContentContainer>
      <style>{`.container {
  display: flex;
  border-radius: var(--navds-border-radius-medium);
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  min-height: 10rem;
  background: repeating-linear-gradient(
    45deg,
    #d6d6d6,
    #d6d6d6 10px,
    transparent 10px,
    transparent 20px
  );
}`}</style>
    </>
  );
};
