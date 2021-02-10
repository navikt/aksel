import React from "react";
import { ArticleLayout } from "../src/index";
import Lenke from "nav-frontend-lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { Cell, Grid } from "../../grid/src";
import { Button, Heading } from "../../lib";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";

export default {
  title: "@navikt/layout",
  component: { ArticleLayout },
};

export const All = () => {
  const Navigation = () => (
    <ul style={styles.ul}>
      <li style={styles.li}>
        <Lenke href={"#"}>Iusto odio dignissimos</Lenke>
      </li>
      <li style={styles.li}>
        <Lenke href={"#"}>Nam libero tempore</Lenke>
      </li>
      <li style={styles.li}>
        <Lenke href={"#"}>Reiciendis voluptatibus</Lenke>
      </li>
      <li style={styles.li}>
        <Lenke href={"#"}>Earum rerum</Lenke>
      </li>
      <li style={styles.li}>
        <Button>Søk ...</Button>
      </li>
    </ul>
  );
  const Content = () => (
    <div>
      <Heading style={styles.p} level={1} size={"xl"}>
        Quis autem
      </Heading>
      <Normaltekst style={styles.p}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt.{" "}
      </Normaltekst>
      <Grid>
        <Cell style={styles.p} sm={2}>
          <Lenke href={"#"}>Test</Lenke>
        </Cell>
        <Cell style={styles.p} sm={2}>
          <Lenke href={"#"}>Test</Lenke>
        </Cell>
      </Grid>
      <Normaltekst style={styles.p}>
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora
        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.{" "}
      </Normaltekst>
      <Normaltekst style={styles.p}>
        Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
        suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
        autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
        nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?
      </Normaltekst>
    </div>
  );
  const Context = () => (
    <div>
      <Ekspanderbartpanel tittel={"Snareveier"}>Test</Ekspanderbartpanel>
    </div>
  );
  return (
    <ArticleLayout
      leftContent={<Navigation />}
      mainContent={<Content />}
      rightContent={<Context />}
    />
  );
};

const styles = {
  ul: {
    margin: 0,
    padding: 0,
    listStyleType: "none",
  },
  li: {
    marginBottom: "1rem",
  },
  p: {
    marginBottom: "1rem",
  },
};
