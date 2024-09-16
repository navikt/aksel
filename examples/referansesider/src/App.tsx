import styled from "styled-components";
import "@navikt/ds-css";
import { Button, VStack } from "@navikt/ds-react";
import "@navikt/ds-tokens";
// TODO: why does this not work?
// import { ASurfaceSuccess } from "@navikt/ds-tokens";
import "./App.css";

const StyledButton = styled(Button)`
  color: orange;
  background-color: var(--a-surface-success);
  border: solid 2px salmon;
`;

function App() {
  return (
    <VStack gap="10">
      <Button>normal Aksel button! (unstyled)</Button>
      <StyledButton variant="secondary">styled button</StyledButton>
    </VStack>
  );
}

export default App;
