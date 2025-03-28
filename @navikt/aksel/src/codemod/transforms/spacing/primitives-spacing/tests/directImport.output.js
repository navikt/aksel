import { Box } from "@navikt/ds-react/Box";

export const Demo = () => (
  <Box
    before="before"
    marginInline={{ xs: "auto", sm: "space-96", md: "space-128 space-44" }}
    padding="space-96"
    paddingInline="space-48 space-128"
    after="after"
  >
    <div>ELEMENT</div>
  </Box>
);
