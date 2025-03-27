/*
TODO: aksel box migration:
Could not migrate the following:
  - shadow=large
  - background=surface-alt-3-strong
    - Use 'bg-brand-blue-moderate' in theme 'dark'-mode.
*/

import { BoxNew } from "@navikt/ds-react/Box"
import { Box } from "@navikt/ds-react"

export const MyComponent = () => {
  return (<>
    <BoxNew background="bg-neutral-soft" borderColor="border-meta-purple">
      migratable
    </BoxNew>
    <Box background="bg-neutral-soft" borderColor="border-meta-purple" shadow="large">
      migratable + unmigratable (no comment)
    </Box>
    <Box background="surface-alt-3-strong" >
      unmigratable (with comment)
    </Box>
    <BoxNew borderWidth="4" padding={{ lg: "10", sm: "8" }} height="200rem">
      old
    </BoxNew>
    <BoxNew borderWidth="4" background="bg-neutral-soft">
      old + migratable
    </BoxNew>
  </>);
}
