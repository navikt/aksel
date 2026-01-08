import { ASurfaceSubtle, ASurfaceNeutral, ASurfaceTransparent } from "@navikt/ds-tokens/dist/tokens";

/**
 * Since only some tokens has a replacement, we have to keep both imports
 */
const StyledDiv = styled.div`
    background-color: ${ASurfaceNeutral};
    color: ${ASurfaceTransparent};
`

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
