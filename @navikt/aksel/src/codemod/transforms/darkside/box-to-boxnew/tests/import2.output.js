import Box from '@mui/material/Box';
import { BoxNew } from "@navikt/ds-react/Box"

export const MyComponent = () => {
return (<>
  <Box>unrelated Box from @mui/material</Box>
  <BoxNew>
    simple rename of import
  </BoxNew>
</>);
}
