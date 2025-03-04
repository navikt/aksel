import { Box as DSBOX } from "@navikt/ds-react";

export const Demo = () => (
  <DSBOX
    before="before"
    marginInline={{ xs: "auto", sm: "space-96", md: "space-128 space-44" }}
    padding="space-96"
    paddingInline="space-48 space-128"
    after="after"
  >
    <div>ELEMENT</div>
  </DSBOX>
);
