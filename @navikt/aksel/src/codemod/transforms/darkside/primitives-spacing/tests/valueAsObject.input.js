import { Box } from "@navikt/ds-react";

export const Demo = () => (
  <Box
    before="before"
    marginInline={{ xs: "auto", sm: mdValue, md: getMdValue() }}
    padding="24"
    paddingInline="12 32"
    after="after"
  >
    <div>ELEMENT</div>
  </Box>
);
