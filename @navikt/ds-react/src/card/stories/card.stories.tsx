import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { MicroCard } from "../index";
import { Meta } from "@storybook/react/types-6-0";
export default {
  title: "ds-react/card",
  component: MicroCard,
} as Meta;

export const All = () => {
  return (
    <div>
      <h2>MicroCard</h2>
      <MicroCard href="#">Sit laborum aliqua.</MicroCard>
      <MicroCard override>
        <button onClick={console.log}>Sit laborum aliqua.</button>
      </MicroCard>
      <HashRouter>
        <MicroCard override>
          <Link to="about">Sit laborum aliqua.</Link>
        </MicroCard>
      </HashRouter>
    </div>
  );
};
