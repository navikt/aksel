import React from "react";
import { LinkPanel } from "../index";

export default {
  title: "ds-react/linkPanel",
  component: LinkPanel,
};

export const All = () => {
  return (
    <>
      <h1>Link</h1>
      <LinkPanel href="#">Dette er en tekstlenke</LinkPanel>

      <h1>noHeading</h1>
      <LinkPanel noHeading href="#">
        <span>Dette er en tekstlenke</span>
      </LinkPanel>

      <h1>No border</h1>
      <LinkPanel href="#" border={false}>
        <span>Dette er en tekstlenke</span>
      </LinkPanel>
    </>
  );
};
