import { BgNeutralStrong, BgNeutralSoft } from "@navikt/ds-tokens/darkside-js";

/**
 * Since all tokens has a replacement, we want to remove old import when empty
 */
const StyledDiv = styled.div`
    background-color: ${BgNeutralStrong};
`

/* Should not be updated since its not imported */
const oldColorTokens = {
  js: "ABlue100",
}

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

