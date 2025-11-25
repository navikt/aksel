import { Box } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <Box borderRadius="large">Large</Box>
      <Box borderRadius="large small">Large small</Box>
      <Box borderRadius={{xs: "large small", md: "large"}}>Large small complex</Box>
    </div>
  );
};
