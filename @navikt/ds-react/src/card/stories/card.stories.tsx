import React from "react";
import { MicroCard } from "../index";
import { Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";
export default {
  title: "ds-react/card",
  component: MicroCard,
} as Meta;

const StyledMicroCard = styled(MicroCard)`
  height: 200px;
  width: 300px;
`;

export const All = () => {
  return (
    <div>
      <h2>MicroCard</h2>
      <MicroCard href="#">Sit laborum aliqua.</MicroCard>
      <h2>MicroCard styled</h2>
      <StyledMicroCard href="#">Styled components card</StyledMicroCard>
      <h3>as</h3>
      <StyledMicroCard href="#" as="span">
        Styled components card
      </StyledMicroCard>
    </div>
  );
};
