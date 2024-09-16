import styled from "styled-components";
import "@navikt/ds-css";
import { Button, VStack } from "@navikt/ds-react";
import "@navikt/ds-tokens";
import * as tokens from "@navikt/ds-tokens/dist/tokens";
import "./App.css";

const StyledButton = styled(Button)`
  background-color: var(--a-surface-success);
  color: ${tokens.APurple500};
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
