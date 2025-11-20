import { Box } from "@navikt/ds-react";

export const MyComponent = () => {
  return (
    <div>
      <Box borderRadius="8">Large</Box>
      <Box borderRadius="8 2">Large small</Box>
      <Box borderRadius={{xs: "8 2", md: "8"}}>Large small complex</Box>
    </div>
  );
};
