import React from "react";
import { LinkPanel } from "../index";
import { Illustration } from "./illustration";

export default {
  title: "ds-react/linkPanel",
  component: LinkPanel,
};

export const All = () => {
  return (
    <>
      <h1>Link</h1>
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
      <LinkPanel href="#" style={{ textDecoration: "none" }}>
        {Illustration}
        <div>
          <LinkPanel.Title>Consectetur eu duis aliqua</LinkPanel.Title>
          <LinkPanel.Content>Aliqua id aliquip Lorem esse</LinkPanel.Content>
        </div>
      </LinkPanel>
    </>
  );
};
