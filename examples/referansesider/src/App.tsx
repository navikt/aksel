import styled from "styled-components";
import "@navikt/ds-tokens";
import * as tokens from "@navikt/ds-tokens/dist/tokens";
import "./App.css";

const StyledButton = styled(variantProps)`
  background-color: var(--a-surface-success);
  color: ${tokens.APurple500};
  border: solid 2px salmon;
`;

function App() {
  return (
    <>
      <button>normal button</button>
      <StyledButton className="my-best-class">styled button</StyledButton>
    </>
  );
}

export default App;
