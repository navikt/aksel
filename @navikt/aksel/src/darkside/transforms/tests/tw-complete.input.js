const oldColorTokens = {
  js: "bg-red-500 group:hover:bg-surface-subtle hover:bg-surface-transparent",
}

export const testComponent = () => {
  return (
    <StyledDiv
      className="test md:bg-surface-subtle! text-red-500! lg:via-surface-transparent z-tooltip! test"
    >
      Test
    </StyledDiv>
  );
};
