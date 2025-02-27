/* Since all tokens has a replacement, we want to remove old import when empty */
import { ASurfaceSubtle, ASurfaceNeutral } from "@navikt/ds-tokens/dist/tokens";

const StyledDiv = styled.div`
    background-color: ${ASurfaceNeutral};
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
