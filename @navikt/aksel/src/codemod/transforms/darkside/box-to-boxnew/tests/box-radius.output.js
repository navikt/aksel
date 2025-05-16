import { BoxNew } from "@navikt/ds-react/Box";

export const MyComponent = () => {
  return (
    <div>
      <BoxNew borderRadius="8">Large</BoxNew>
      <BoxNew borderRadius="8 2">Large small</BoxNew>
      <BoxNew borderRadius={{xs: "8 2", md: "8"}}>Large small complex</BoxNew>
    </div>
  );
};
