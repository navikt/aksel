import styled from "styled-components";
import "@navikt/ds-tokens";
import * as tokens from "@navikt/ds-tokens/dist/tokens";
import "./App.css";

const StyledButton = styled.button<{ variant?: "purple" }>`
  background-color: ${(props) =>
    props.variant === "purple" ? tokens.APurple500 : tokens.AGrayalpha400};
  color: ${(props) =>
    props.variant === "purple" ? tokens.APurple800 : tokens.AWhite};
  border: solid 2px ${tokens.ADeepblue900};
`;

function App() {
  return (
    <>
      <button>normal button</button>
      <StyledButton variant="purple">purple variant</StyledButton>
    </>
  );
}

export default App;
