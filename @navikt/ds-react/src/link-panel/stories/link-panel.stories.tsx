import React from "react";
import styled from "styled-components";
import { LinkPanel } from "..";
import { Illustration } from "./illustration";

export default {
  title: "ds-react/linkPanel",
  component: LinkPanel,
};

const StyledLinkPanel = styled(LinkPanel)`
  .navds-link-panel__content {
    display: grid;
    grid-auto-flow: column;
    gap: var(--navds-spacing-8);
    align-items: center;
  }
`;

export const All = () => (
  <>
    <h1>Link panel</h1>
    <LinkPanel href="#">
      <LinkPanel.Title>
        Consectetur eu duis aliqua eu irure fugiat fugiat eu.
      </LinkPanel.Title>
      <LinkPanel.Content>Aliqua id aliquip Lorem esse</LinkPanel.Content>
    </LinkPanel>

    <h1>No border</h1>
    <LinkPanel href="#" border={false}>
      <LinkPanel.Title>
        Veniam cillum cupidatat aliqua id ipsum culpa ea.
      </LinkPanel.Title>
    </LinkPanel>

    <h1>Custom styling</h1>
    <StyledLinkPanel href="#">
      {Illustration}
      <div>
        <LinkPanel.Title>
          Anim pariatur eiusmod deserunt elit cillum
        </LinkPanel.Title>
        <LinkPanel.Content>
          Ex velit id voluptate labore irure ipsum exercitation sunt et id enim
          magna veniam consequat. id aliquip Lorem esse
        </LinkPanel.Content>
      </div>
    </StyledLinkPanel>
  </>
);
