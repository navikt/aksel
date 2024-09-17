import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/tokens";
import SykepengerIkon from "../assets/SykepengerIkon";

const StyledButton = styled.button<{ variant?: "purple" }>`
  background-color: ${(props) =>
    props.variant === "purple" ? tokens.APurple500 : tokens.AGrayalpha400};
  color: ${(props) =>
    props.variant === "purple" ? tokens.APurple800 : tokens.AWhite};
  border: solid 2px ${tokens.ADeepblue900};
`;

const Component = () => {
  return (
    <>
      <h1>hello from sykepenger</h1>
      <StyledButton variant="purple">styled button</StyledButton>
      <SykepengerIkon />
    </>
  );
};

export const Route = createFileRoute("/sykepenger")({ component: Component });
