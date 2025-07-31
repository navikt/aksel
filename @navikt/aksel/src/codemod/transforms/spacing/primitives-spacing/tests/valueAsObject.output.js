import { Box } from "@navikt/ds-react";

export const Demo = () => (
  <Box
    before="before"
    marginInline={{ xs: "auto", sm: mdValue, md: getMdValue() }}
    padding="space-96"
    paddingInline="space-48 space-128"
    after="after"
  >
    <div>ELEMENT</div>
  </Box>
);
