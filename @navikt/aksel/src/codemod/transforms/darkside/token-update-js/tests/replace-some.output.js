/* Since only some tokens has a replacement, we have to keep both imports */
import { ASurfaceTransparent } from "@navikt/ds-tokens/dist/tokens";
import { BgNeutralStrong, BgNeutralSoft } from "@navikt/ds-tokens/darkside-js";

const StyledDiv = styled.div`
    background-color: ${BgNeutralStrong};
    color: ${ASurfaceTransparent};
`

export const testComponent = () => {
  return (
    <StyledDiv
      className="test bg-(--ax-bg-neutral-strong)"
      style={{ backgroundColor: BgNeutralSoft }}
    >
      Test
    </StyledDiv>
  );
};

