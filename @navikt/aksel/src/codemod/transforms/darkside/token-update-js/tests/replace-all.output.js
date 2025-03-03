import { BgNeutralStrong, BgNeutralSoft } from "@navikt/ds-tokens/darkside-js";

/**
 * Since all tokens has a replacement, we want to remove old import when empty
 */
const StyledDiv = styled.div`
    background-color: ${BgNeutralStrong};
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

