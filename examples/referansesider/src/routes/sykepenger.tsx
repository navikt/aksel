import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/tokens";

const StyledButton = styled.button<{ variant?: "purple" }>`
  background-color: ${(props) =>
    props.variant === "purple" ? tokens.APurple500 : tokens.AGrayalpha400};
  color: ${(props) =>
    props.variant === "purple" ? tokens.APurple800 : tokens.AWhite};
  border: solid 2px ${tokens.ADeepblue900};
`;

const Component = () => {
  return (
    <div>
      <h1>Sykepenger</h1>
      <button>plain button</button>
      <StyledButton>styled button</StyledButton>
    </div>
  );
};

export const Route = createFileRoute("/sykepenger")({ component: Component });
