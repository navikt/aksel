import Box from '@mui/material/Box';
import { Box as AkselBox } from "@navikt/ds-react"

export const MyComponent = () => {
return (<>
  <Box>unrelated Box from @mui/material</Box>
  <AkselBox>
    simple rename of import
  </AkselBox>
</>);
}
