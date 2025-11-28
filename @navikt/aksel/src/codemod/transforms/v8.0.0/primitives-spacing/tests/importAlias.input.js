import { Box as DSBOX } from "@navikt/ds-react";

export const Demo = () => (
  <DSBOX
    before="before"
    marginInline={{ xs: "auto", sm: "24", md: "32 11" }}
    padding="24"
    paddingInline="12 32"
    after="after"
  >
    <div>ELEMENT</div>
  </DSBOX>
);
