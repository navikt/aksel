import React from "react";
import { LinkPanel } from "..";
import { Illustration } from "./illustration";

export default {
  title: "ds-react/linkPanel",
  component: LinkPanel,
};

export const All = () => (
  <>
    <h1>Link panel</h1>
    <LinkPanel href="#">
      <LinkPanel.Title>
        Consectetur eu duis aliqua eu irure fugiat fugiat eu.
      </LinkPanel.Title>
      <LinkPanel.Description>
        Aliqua id aliquip Lorem esse
      </LinkPanel.Description>
    </LinkPanel>

    <h1>No border</h1>
    <LinkPanel href="#" border={false}>
      <LinkPanel.Title>
        Veniam cillum cupidatat aliqua id ipsum culpa ea.
      </LinkPanel.Title>
    </LinkPanel>

    <h1>Custom styling</h1>
    <LinkPanel href="#" className="linkpanel">
      {Illustration}
      <div>
        <LinkPanel.Title>
          Anim pariatur eiusmod deserunt elit cillum
        </LinkPanel.Title>
        <LinkPanel.Description>
          Ex velit id voluptate labore irure ipsum exercitation sunt et id enim
          magna veniam consequat. id aliquip Lorem esse
        </LinkPanel.Description>
      </div>
    </LinkPanel>
    <style>{`
      .linkpanel .navds-link-panel__content {
        display: grid;
        grid-auto-flow: column;
        gap: var(--navds-spacing-8);
        align-items: center;
      }
    `}</style>
  </>
);
