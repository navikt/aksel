import { ASurfaceSubtle, ASurfaceNeutral } from "@navikt/ds-tokens/dist/tokens";

/**
 * Since all tokens has a replacement, we want to remove old import when empty
 */
const StyledDiv = styled.div`
    background-color: ${ASurfaceNeutral};
`

/* Should not be updated since its not imported */
const oldColorTokens = {
  js: "ABlue100",
}

export const testComponent = () => {
  return (
    <StyledDiv
      className="test bg-(--ax-bg-neutral-strong)"
      style={{ backgroundColor: ASurfaceSubtle }}
    >
      Test
    </StyledDiv>
  );
};
