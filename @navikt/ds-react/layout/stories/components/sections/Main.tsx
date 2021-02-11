import * as React from "react";
import { Heading } from "../../../../lib/typography/src";
import { Normaltekst } from "nav-frontend-typografi";
import { Cell, Grid } from "../../../../grid/src";
import Lenke from "nav-frontend-lenker";

export const Main = () => (
  <div>
    <Heading className={"section"} level={1} size={"xl"}>
      Quis autem
    </Heading>
    <Normaltekst className={"section"}>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
      inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
      fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
      sequi nesciunt.{" "}
    </Normaltekst>
    <Grid>
      <Cell className={"section"} sm={2} md={4} lg={6}>
        <Lenke href={"#"}>Test</Lenke>
      </Cell>
      <Cell className={"section"} sm={2} md={4} lg={6}>
        <Lenke href={"#"}>Test</Lenke>
      </Cell>
    </Grid>
    <Normaltekst className={"section"}>
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
      consectetur, adipisci velit, sed quia non numquam eius modi tempora
      incidunt ut labore et dolore magnam aliquam quaerat voluptatem.{" "}
    </Normaltekst>
    <Normaltekst className={"section"}>
      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
      suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
      vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
      molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
      pariatur?
    </Normaltekst>
  </div>
);
